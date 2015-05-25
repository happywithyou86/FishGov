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
import base64
import requests
from bs4 import BeautifulSoup
from elasticsearch import Elasticsearch
from selenium import webdriver
from json import dumps
import paramiko
import select
import sys
import time
import select
import paramiko

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
            print(html)
            data["description"] = ""
			
		# These fields can be pulled directly from the respective class
        extract = {
            "notice_type": "dnf_class_values_procurement_notice__procurement_type__widget",
            # Original posted date
            "posted_date": "dnf_class_values_procurement_notice__original_posted_date__widget",
            # Posted date
            "last_posted_date": "dnf_class_values_procurement_notice__posted_date__widget",
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
        
        # If there was no original posted date as in the case of an original solicitation use last posted date
        if data["posted_date"] == "":
            data["posted_date"] = data["last_posted_date"]
            
        try:
            desc = bs_content.find("div", {"class": "agency-logo"})
            print(str(desc))
            data["logo_url"]= urljoin("https://www.fbo.gov/index", desc.find("img")["src"].strip())
            print(data["logo_URL"])
        except:
            print("Error getting logo URL")
        
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
            try:
                attachments.append({
                    "url": urljoin("https://www.fbo.gov/index",
                        attachment.find("a")["href"].strip()),
                    "title": attachment.find("a").text.strip(),
                    "description": attachment.find_all("div")[-1] \
                        .text[len("Description:"):].strip(),
                })
            except:
                print("Got an error in parsing attachment.")
        data["attachments"] = attachments       
        data["listing_url"] = url
        data["data_source"] = "FBO"
       
        return data
    
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
            iD = (new_data["data_source"] + "-" + new_data["solnbr"])
            print (iD)
            index = {
            "index":{
            "_id": iD,
            "_type": "data",
            "_index": "fishgov"
            }}

            # Write to bulk load file
            with open("preload_fedbizopps.json", "a") as out:
                out.write(json.dumps(index) + "\n" + json.dumps(new_data) + "\n")


    	

    # Write the JSON data out
    with open("fedbizopps.json", "w") as out:
        str_ = ""
        for d in data:
            str_ += "\n" + json.dumps(d, indent=4, sort_keys=True)
        out.write(str_);
    

    
    

def main():

    host = '192.96.159.94'
    username = 'canino_jories'
    password = 'joriescanino'
    port = 22
        
    # Setup FTP to push bulk file to server
    transport = paramiko.Transport((host, port))
    transport.connect(username=username, password=password)
    sftp = paramiko.SFTPClient.from_transport(transport)

    # Setup SSH to command curl for PUT of bulk file locally on remote host
    i = 1
    while True:
        print("Trying to connect to %s (%i/30)" % (host, i))

        try:
            ssh = paramiko.SSHClient()
            ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            ssh.connect(host, username=username, password=password)
            print("Connected to %s" % host)
            break
        except paramiko.AuthenticationException:
            print("Authentication failed when connecting to %s" % host)
            sys.exit(1)
        except:
            print("Could not SSH to %s, waiting for it to start" % host)
            i += 1
            time.sleep(2)

        # If we could not connect within time limit
        if i == 30:
            print("Could not connect to %s. Giving up" % host)
            sys.exit(1)
        
    # Loop through the different search result pages
    for num in range(10,12):
        html = get_index(num)
        print ('Downloading solicitation data from page ' + str(num))
        parse_index(html)

        # Upload the bulk file
        filepath = '/home/'+username+'/Projects/github/preload_fedbizopps.json'
        localpath = 'C:\\Users\\Stephen\\preload_fedbizopps.json'
        sftp.put(localpath, filepath)
    
        # Command the POST of the bulk file into Elasticsearch
        stdin, stdout, stderr = ssh.exec_command("curl -s -XPOST localhost:9200/_bulk --data-binary @Projects/github/preload_fedbizopps.json; echo")
        print(stdout.channel.recv_exit_status())
        # Wait for the command to terminate
        while not stdout.channel.exit_status_ready():
            # Only print data if there is data to read in the channel
            if stdout.channel.recv_ready():
               print(stdout.readlines())
        
        os.remove('C:\\Users\\Stephen\\preload_fedbizopps.json')
        
    # Close up
    sftp.close()
    transport.close()
    ssh.close()


if __name__ == '__main__':
    main()
