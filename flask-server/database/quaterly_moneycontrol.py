from mongoengine import connect
from models import Script
from concurrent import futures
from itertools import count
from datetime import datetime
import utilities

def get_standalone_results(code):
	standalone, flag, counter = [], True, 1
	while flag:
		soup	= utilities.get_soup('https://www.moneycontrol.com/financials/tataconsultancyservices/results/quarterly-results/' + code + '/' + str(counter) + '#' + code)
		try:
			table	 = soup.find('table', {'class': 'mctable1'})
			if table == None:
				flag = False
				continue
			headings	= table.find('tr').find_all('td')[1:-1]
			results		= []
			for head in headings:
				results.append({'date': datetime.strptime(head.text, "%b '%y")})
			for row in table.find_all('tr', {'class': ''})[1:35]:
				key = row.find('td').text
				table_cells = row.find_all('td')[1:-1]
				for i in range(0, len(table_cells)):
					if table_cells[i].text == '--': continue
					results[i][key] = float(table_cells[i].text.replace(',', ''))
			standalone.extend(results)
			counter += 1
		except (AttributeError):
			flag = False
	return standalone

def get_consolidated_results(code):
	consolidated, flag, counter = [], True, 1
	while flag:
		soup	= utilities.get_soup('https://www.moneycontrol.com/financials/tataconsultancyservices/results/consolidated-quarterly-results/' + code + '/' + str(counter) + '#' + code)
		try:
			table	 = soup.find('table', {'class': 'mctable1'})
			if table == None:
				flag = False
				continue
			headings	= table.find('tr').find_all('td')[1:-1]
			results		= []
			for head in headings:
				results.append({'date': datetime.strptime(head.text, "%b '%y")})
			for row in table.find_all('tr', {'class': ''})[1:35]:
				key = row.find('td').text
				table_cells = row.find_all('td')[1:-1]
				for i in range(0, len(table_cells)):
					if table_cells[i].text == '--': continue
					results[i][key] = float(table_cells[i].text.replace(',', ''))
			consolidated.extend(results)
			counter += 1
		except (AttributeError):
			flag = False
	return consolidated


def get_details(company, index):
	soup = utilities.get_soup(company.url)
	try:
		shareholding_soup	= soup.find('table', {'class': 'mctable1 thborder sharePriceTotalCal'})
		headings			= shareholding_soup.find_all('th')[1:]
		holdings			= company['shareholding'] if 'shareholding' in company else {}
		for i in headings:
			holdings[i.text] = {'date': datetime.strptime(i.text, "%B %Y")}
		
		table_rows = shareholding_soup.find('tbody').find_all('tr')

		for row in table_rows:
			key = row.find('td').text
			table_data = row.find_all('td')[1:-1]
			for i in range(0, len(table_data)):
				try:
					holdings[headings[i].text][key] = float(table_data[i].text)
				except (AttributeError, TypeError, ValueError):
					holdings[headings[i].text][key] = 0

		company['shareholding']	= holdings
	except (AttributeError):
		pass

	standalone					= get_standalone_results(company['code'].upper())
	if len(standalone) > 0 :
		company['standalone']	= standalone
	
	consolidated				= get_consolidated_results(company['code'].upper())
	if len(consolidated) > 0:
		company['consolidated']	= consolidated
	
	if any(key in company for key in ['shareholding', 'standalone', 'consolidated']):
		company.save()
		print(index, '\t ' + company['name'])
	else:
		print(index, '\t ' + company['name'] + '\t failed')


if __name__ == "__main__":
	connect('stock_exchange')
	j = 0
	# for i in Script.objects(name__ne=None):
	# 	try:
	# 		get_details(i, j)
	# 		j = j+1
	# 	except Exception as e:
	# 		print(e)
	executor	= futures.ThreadPoolExecutor()
	results		= executor.map(get_details, Script.objects(name__ne=None), count())