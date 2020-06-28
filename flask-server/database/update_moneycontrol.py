from mongoengine import connect
from models import Script, Indicies, Trade, User
from concurrent import futures
from itertools import count
from datetime import datetime, timedelta
from pprint import pprint
import requests

def get_history_price(csv_url):
	response	= requests.get(csv_url).content.decode('utf-8').split('\n')
	data		= [row.split(',') for row in response]
	prices = []
	for row in data:
		try:
			prices.append([datetime.strptime(row[0], '%d %b %Y') + timedelta(seconds=19800), float(row[1]), float(row[2]), float(row[3]), float(row[4]), int(row[5])])
		except ValueError as e:
			continue
	return prices

exchange_fields = {
	'pricecurrent'		: 'price',
	'pricechange'		: 'change',
	'pricepercentchange': 'pricepercentchange',
	'priceprevclose'	: 'prev_close',
	'52H'				: '52H',
	'52L'				: '52L',
	'HP'				: 'HP',
	'LP'				: 'LP',
	'VOL'				: 'VOL',
	'OPN'				: 'OPN',
}

def get_index_prices(response):
	obj = {}
	for key in exchange_fields.keys():
		try:
			obj[exchange_fields[key]] = float(response[key])
		except (TypeError, KeyError):
			pass
		except Exception as e:
			print(type(e).__name__)
			print(key, response['company'], response['DISPID'])
			print(e)
	return obj


str_fields	= {
	'SC_FULLNM':	'full_name',
	'company':		'name',
	'SC_SUBSEC':	'sector',
	'isinid':		'isin'
}
float_field = {
	'FV':			'FaceValue',
	'MKTCAP':		'MKTCAP',
	'PE':			'PE',
	'BV':			'BV',
	'DIVPR':		'DIVPR',
	'IND_PE':		'IND_PE',
	'SC_TTM':		'SC_TTM',
	'5DayAvg':		'5DayAvg',
	'30DayAvg':		'30DayAvg',
	'50DayAvg':		'50DayAvg',
	'150DayAvg':	'150DayAvg',
	'200DayAvg':	'200DayAvg'
}

def get_company_data(company, count):
	responseBse	= requests.get('https://priceapi.moneycontrol.com/pricefeed/bse/equitycash/' + company.code.upper()).json()
	responseNse	= requests.get('https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/' + company.code.upper()).json()

	if responseNse['code'] == '200' and responseNse['data']['LP'] != '-' and responseNse['data']['OPN'] != '-':
		company['priceObj'] = 'nse'
		for key in str_fields.keys():
			try:
				company[str_fields[key]]	= responseNse['data'][key]
			except Exception as e:
				print(type(e).__name__, company.code)
				print(key, e)
		for key in float_field.keys():
			try:
				company[float_field[key]]	= float(responseNse['data'][key])
			except Exception as e:
				if responseNse['data'][key] == None: continue
				print(type(e).__name__, company.code)
				print(key, e)
		try:
			company['lastupd']	= datetime.strptime(responseNse['data']['lastupd'], '%Y-%m-%d %H:%M:%S')
			company['NSEID']	= responseNse['data']['NSEID']
			company['nse']		= get_index_prices(responseNse['data'])
			company['SHRS']		= int(float(responseNse['data']['SHRS']))
			company['nseHist']	= get_history_price('https://www.moneycontrol.com/tech_charts/nse/his/' + company['code'] + '.csv')
			if responseBse['code'] == '200':
				company['BSEID']	= int(responseBse['data']['BSEID'])
				company['bse']		= get_index_prices(responseBse['data'])
				company['bseHist']	= get_history_price('https://www.moneycontrol.com/tech_charts/bse/his/' + company['code'] + '.csv')
		except Exception as e:
			print(type(e).__name__, company.code)
			print(e)
	
	elif responseBse['code'] == '200' and responseBse['data']['LP'] != '-':
		company['priceObj'] = 'bse'
		for key in str_fields.keys():
			try:
				company[str_fields[key]]	= responseBse['data'][key]
			except Exception as e:
				print(type(e).__name__, company.code)
				print(key, e)
		for key in float_field.keys():
			try:
				company[float_field[key]]	= float(responseBse['data'][key])
			except Exception as e:
				if responseBse['data'][key] == None: continue
				print(type(e).__name__, company.code)
				print(key, e)
		try:
			company['lastupd']	= datetime.strptime(responseBse['data']['lastupd'], '%Y-%m-%d %H:%M:%S')
			company['BSEID']	= int(responseBse['data']['BSEID'])
			company['bse']		= get_index_prices(responseBse['data'])
			company['SHRS']		= int(float(responseBse['data']['SHRS']))
			company['bseHist']	= get_history_price('https://www.moneycontrol.com/tech_charts/bse/his/' + company['code'] + '.csv')
		except Exception as e:
			print(type(e).__name__, company.code)
			print(e)
	else:
		return
	company.save()
	print(count, '\t ' + company['name'])


def update_index(index, count):
	response    = requests.get("https://appfeeds.moneycontrol.com/jsonapi/market/indices&format=json&ind_id=" + str(index['ind_id'])).json()
	if (datetime.now() - datetime.strptime(response['indices']['lastupdated'], '%d %b, %Y %H:%M')).days > 5:
		return
	
	index['stkexchg']		= response['indices']['stkexchg']
	index['exchange']		= response['indices']['exchange']
	index['ind_id']			= str(response['indices']['ind_id'])
	index['lastprice']		= float(response['indices']['lastprice'].replace(',', ''))
	index['change']			= float(response['indices']['change'].replace(',', ''))
	index['percentchange']	= float(response['indices']['percentchange'])
	index['open']			= float(response['indices']['open'].replace(',', ''))
	index['high']			= float(response['indices']['high'].replace(',', ''))
	index['low']			= float(response['indices']['low'].replace(',', ''))
	index['prevclose']		= float(response['indices']['prevclose'].replace(',', ''))
	index['yearlyhigh']		= float(response['indices']['yearlyhigh'].replace(',', ''))
	index['yearlylow']		= float(response['indices']['yearlylow'].replace(',', ''))
	index['ytd']			= float(response['indices']['ytd'].replace(',', ''))
	index['lastupdated']	= datetime.strptime(response['indices']['lastupdated'], '%d %b, %Y %H:%M')
	
	if index['history_url'] is not None:
		res		= requests.get(index['history_url']).content.decode('utf-8').split('\n')
		data	= [row.split(',') for row in res]
		prices = []
		for row in data:
			prices.append([datetime.strptime(row[0], '%d %b %Y') + timedelta(seconds=19800), float(row[1]), float(row[2]), float(row[3]), float(row[4]), int(row[5])])
		index['history'] = prices
	index.save()
	print(count, '.\t' + index['stkexchg'])

def complete_update():
	connect('stock_exchange')
	executor	= futures.ThreadPoolExecutor()
	indResults	= executor.map(update_index, Indicies.objects, count())
	results		= executor.map(get_company_data, Script.objects(name__ne=None), count())

def partial_update():
	connect('stock_exchange')
	codes		= Trade.objects().distinct(field='code')
	watchlists	= User.objects().only('watchlist')
	for watchlist in watchlists:
		codes.extend(watchlist.watchlist)
	codes		= set(codes)
	# Testing Only
	# for i in Script.objects(code__in=codes):
	# 	get_company_data(i, count())
	executor	= futures.ThreadPoolExecutor()
	indResults	= executor.map(update_index, Indicies.objects, count())
	results		= executor.map(get_company_data, Script.objects(code__in=codes), count())

if __name__ == "__main__":
	# complete_update()
	partial_update()