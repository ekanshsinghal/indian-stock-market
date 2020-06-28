import requests
from bs4 import BeautifulSoup

# Procedure to return a parseable BeautifulSoup object of a given url
def get_soup(url):
	try:
		response = requests.get(url)
		response.raise_for_status()
		return BeautifulSoup(response.content,'lxml')
	except (requests.exceptions.HTTPError, requests.exceptions.ChunkedEncodingError, requests.exceptions.ConnectionError) as e:
		print(type(e).__name__)
		print(url + '\t\t ERROR........')
		return 'error'