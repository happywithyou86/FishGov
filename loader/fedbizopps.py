#!/usr/bin/env python

# Copyright (c) 2015, Stephen McClanahan www.govfish.com

"""
    Dependencies:
        python 2.5
        lxml
        selenium
"""

import os
import re
import json
import requests
from bs4 import BeautifulSoup
from elasticsearch import Elasticsearch
from selenium import webdriver

try:
    from urllib.parse import urljoin
    
except ImportError:
    from urlparse import urljoin
    
    
BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def get_index(pageNum):
	
    print('Starting webdriver in Chrome...')
    driver = webdriver.Chrome()
    driver.get("https://www.fbo.gov/index?s=opportunity&mode=list&tab=list&tabmode=list&pp=100&pageID="+str(pageNum))
    driver.refresh()
    html = driver.page_source
    driver.quit()
    return html

def parse_index(html):
    
    def parse_link(url, i=0):
        
        #print("%d. URL: " % i + url)
		
        data = {}
        html = requests.get(url).text
        
        if 'The requested notice cannot be found.' in html:
            print('===== The requested notice cannot be found. ====='.upper())
            return None
        
        bs_content = BeautifulSoup(html, "html5lib")
		
		# Pull out the "agency-header" block that contains the Title, Solicitation Number, Agency, Office, and Location info
        div = bs_content.find("div", {"class": "agency-header"})
        lines = [line for line in
            re.sub("<[\s\S]*?>", "\n", str(div)).splitlines() if line.strip()]
        
		# The Title field is in a H2 tag
        try:
            data["title"] = div.find("h2").text.strip()
        except:
            data["title"] = ""
            
        # The other fields are in-line within other tags and need to be stripped
        for key, start in (
                ("solnbr", "Solicitation Number:"),
                ("agency", "Agency:"),
                ("office", "Office:"),
                ("location", "Location:")):
            
            data[key] = ""
            for line in lines:
                if line.startswith(start):
                    data[key] = line.split(":", 2)[1].strip()
                            
        
        # The Description field can have some date information text before the description begins that needs to be stripped
        try:
            desc = bs_content.find("div", {"id": "dnf_class_values_procurement_notice__description__widget"})
            desc_text = desc.text
            date_text = desc.find("div", {"class": "notice_desc_dates"}).text
            data["description"] = desc_text[len(date_text):].strip()
        except:
            data["description"] = ""
			
		# These fields can be pulled directly from the respective class
        extract = {
            "notice_type": "dnf_class_values_procurement_notice__procurement_type__widget",
            # Original posted date
            "posted_date": "dnf_class_values_procurement_notice__original_posted_date__widget",
            # Posted date
            #"posted_date": "dnf_class_values_procurement_notice__posted_date__widget",
            "close_date": "dnf_class_values_procurement_notice__response_deadline__widget",
            "set_aside": "dnf_class_values_procurement_notice__set_aside__widget",
            "classification_code": "dnf_class_values_procurement_notice__classification_code__widget",
            "naics_code": "dnf_class_values_procurement_notice__naics_code__widget",
            
            "contracting_office_address": "dnf_class_values_procurement_notice__office_address__widget",
            "primary_point_of_contact": "dnf_class_values_procurement_notice__primary_poc__widget",
        }
        
        for key, id_ in extract.items():
            try:
                element = bs_content.find("div", {"id": id_})
                if not element:
                    data[key] = ""
                    continue
                
                data[key] = str(element).strip()
                data[key] = data[key].replace("\n", "").replace("\r", "") \
                    .replace("\t", " ")
                data[key] = "\n".join(line.strip() for line in
                    re.sub("<[\s\S]*?>", "\n", data[key]).splitlines()
                        if line.strip())
            except:
                data[key] = ""
        
        if data["notice_type"] == "Award":
            return ""
            print("award")
        if data["notice_type"] == "Award Notice":
            return ""
            print("award")			
        # attachments
        attachments = []
        for attachment in \
                bs_content.find_all("div", {"class": "notice_attachment_ro"}):
            attachments.append({
                "url": urljoin("https://www.fbo.gov/index",
                    attachment.find("a")["href"].strip()),
                "title": attachment.find("a").text.strip(),
                "description": attachment.find_all("div")[-1] \
                    .text[len("Description:"):].strip(),
            })
        data["attachments"] = attachments
        
        data["listing_url"] = url
        data["data_source"] = "FBO"
        
        
        return data
    
    es = Elasticsearch([{'host': 'localhost', 'port': 9200}])
    data = []
    i = 0
	
	# Cycle through all links (solicitations) listed in the main results page
    for link in BeautifulSoup(html).find_all("a", {"class": "lst-lnk-notice"}):
        # Count for number of links parsed
        i += 1
		
		# Get the json data from the solicitation
        new_data = parse_link(urljoin("https://www.fbo.gov/index",
            link["href"].strip()), i)
        
        # Add the new JSON entry to the existing JSON
        if new_data:
            data.append(new_data)
            #print(data)
            iD = (new_data["data_source"] + ":" + new_data["solnbr"])
            print (iD)

            es.index(index='fishgov', doc_type='data', id=iD, body=new_data)
    	

    # Write the JSON data out
    with open("fedbizopps.json", "w") as out:
        str_ = ""
        for d in data:
            str_ += "\n" + json.dumps(d, indent=4, sort_keys=True)
        out.write(str_);
    

def main():


    for num in range(1,3):
        html = get_index(num)
        print ('Downloading solicitation data from page ' + str(num))
        parse_index(html)


if __name__ == '__main__':
    main()
