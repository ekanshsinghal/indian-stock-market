from mongoengine import connect
from models import Script
from concurrent import futures
from itertools import count
from datetime import datetime
from pprint import pprint
import utilities


def get_company_info(tag, count):
	try:
		if tag['href'] == '': return
		soup		= utilities.get_soup(tag['href'])
		code		= soup.find('input', {'id': 'ap_sc_id'})['value'].lower()
		company 	= Script.objects(code=code).update_one(set__url=tag['href'], upsert=True)
		print(count, '.\t' + code)
	except Exception as e:
		print(type(e).__name__)
		print(e)
		print(count, '.\t' + tag)
		return

if __name__ == "__main__":
	try:
		connect('stock_exchange')
		soup			= utilities.get_soup('https://www.moneycontrol.com/india/stockpricequote')
		alphabet_list	= soup.find('div', {'class':'MT2 PA10 brdb4px alph_pagn'})
		alphabet_links	= alphabet_list.find_all('a')
		companies		= []
		for link in alphabet_links[1:]:
			soup			= utilities.get_soup('https://www.moneycontrol.com' + link['href'])
			companies_table	= soup.find('table', {'class':'pcq_tbl MT10'})
			print(link['href'])
			companies.extend(companies_table.find_all('a'))
		
		# j=0
		# for i in companies:
		# 	get_company_info(i, j)
		# 	j +=1
		executor		= futures.ThreadPoolExecutor()
		results			= executor.map(get_company_info, companies, count())
	except Exception as e:
		print(type(e).__name__)
		print(e)