import json
import requests

from bs4 import BeautifulSoup

url = 'https://www.codechef.com/contests'

page = requests.get(url)
soup = BeautifulSoup(page.text, 'html.parser')

Big_table = soup.findAll('table', class_='dataTable')

data = []
i = 0
exit = 0

for table in Big_table:

	if exit == 2:
		break;

	exit += 1;

	table_body = table.find('tbody')

	rows = table_body.find_all('tr');

	for row in rows:
	    cols = row.find_all('td')
	    cols = [ele.text.strip() for ele in cols]
	    data.append([ele for ele in cols if ele]) # Get rid of empty values
	    i += 1
print(data)