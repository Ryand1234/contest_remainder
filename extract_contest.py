import json
import re
import requests
import os

from bs4 import BeautifulSoup

url = 'https://www.codechef.com/contests'

page = requests.get(url)
soup = BeautifulSoup(page.text, 'html.parser')

table = soup.find('table', class_='dataTable')

for row in table:
	print("ROW\n")
	print(row)