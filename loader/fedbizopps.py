#!/usr/bin/env python

# Copyright (c) 2009, James Turk
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without modification,
# are permitted provided that the following conditions are met:
#
# * Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
# * Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
# * Neither the name of James Turk, Sunlight Foundation, Sunlight Labs
# nor the names of its contributors may be used to endorse or promote products
# derived from this software without specific prior written permission.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
# EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
# THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
# PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
# OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
# STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
# OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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

from selenium import webdriver

try:
    from urllib.parse import urljoin
    
except ImportError:
    from urlparse import urljoin
    
    
BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def get_index():
    '''
        use Selenium to access search result page

        Selenium script is as follows:
            Under "Documents To Search." select Both Under Opportunity/Procurement Type
            Select "Awards"
            Under " Recovery and Reinvestment Act Action." select Yes
    '''

    driver = webdriver.Chrome()
    driver.get("https://www.fbo.gov/index?s=opportunity&mode=list&tab=list&tabmode=list&pp=100")
    html = driver.page_source
    driver.quit()
    return html


last_id = None
def parse_index(html, filename):
    global last_id
    
    try:
        with open(os.path.join(BASE_DIR, 'last_id.txt'), 'r') as fh:
            last_id = int(fh.read())
    except FileNotFoundError:
        last_id = 0
        
    
    def parse_link(url, i=0):
        global last_id
        
        print("%d. URL: " % i + url)
        
        data = {}
        html = requests.get(url).text
        
        if 'The requested notice cannot be found.' in html:
            print('===== The requested notice cannot be found. ====='.upper())
            return None
        
        bs_content = BeautifulSoup(html, "html5lib")
        div = bs_content.find("div", {"class": "agency-header"})
        lines = [line for line in
            re.sub("<[\s\S]*?>", "\n", str(div)).splitlines() if line.strip()]
        
        try:
            data["title"] = div.find("h2").text.strip()
        except:
            data["title"] = ""
            
        #print(lines)
        for key, start in (
                ("solnbr", "Solicitation Number:"),
                ("agency", "Agency:"),
                ("office", "Office:"),
                ("location", "Location:")):
            
            data[key] = ""
            for line in lines:
                if line.startswith(start):
                    data[key] = line.split(":", 2)[1].strip()
                    
            #print(key, data[key])
                    
        
        desc = bs_content.find("div",
            {"id": "dnf_class_values_procurement_notice__description__widget"})
        desc_text = desc.text
        date_text = desc.find("div", {"class": "notice_desc_dates"}).text
        data["description"] = desc_text[len(date_text):].strip()
        
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
        
        with open(os.path.join(BASE_DIR, 'last_id.txt'), 'w') as fh:
            fh.write(str(last_id))
        
        #for key in []:
        #    data[key] = html2text(data[key]).strip(); 
        
        last_id += 1
        index = {
            "_index": "fishgov", 
            "_type": "data", 
            "_id": last_id
        }
        
        return index, data
    #parse_link("https://www.fbo.gov/index?s=opportunity&mode=form&id=019c53b73b583455ff71c7bd46332185&tab=core&_cview=0")
    
    data = []
    i = 0
    for link in BeautifulSoup(html).find_all("a", {"class": "lst-lnk-notice"}):
        i += 1
        new_data = parse_link(urljoin("https://www.fbo.gov/index",
            link["href"].strip()), i)
        if new_data:
            data.extend(new_data)
    
    with open("fedbizopps.json", "w") as out:
        str_ = ""
        for d in data:
            str_ += "\n" + json.dumps(d, indent=4, sort_keys=True)
        
        out.write(str_);
    

def main():
    '''
        create CSV of fedbizopps data
    '''
    print ('starting selenium server...')
    #time.sleep(3)   # give the server time to start
    print ('automating browser to download index...')
    html = get_index()
    print ('downloading contract data...')
    parse_index(html, 'fedbizopps.csv')


if __name__ == '__main__':
    main()
