# stock-market-analyzer
Scrapes Indian stock echanges(NSE and BSE) data off moneycontrol and represents in a comprehesive app.

## Requirements
1. Python 3.6+ with pip
2. Mongodb
3. npm (Node package manager)

## Steps to start
### 1. Install Dependencies
```shell
$ cd <proj_dir>
$ npm install
$ npm run build
```
4. python -m venv venv
5. Activate virtual env.
	Windows CMD - ./venv/Scripts/active.bat
	Windows PowerShell - ./venv/Scripts/active.ps1
6. pip install requirements.txt
7. Populate the mongod -database.
	cd flask-server/database
	python initialize_moneycontrol.py [1 time only, will take a few hours].
	python update_moneycontrol.py
8. cd ..
9. python app.py

Disclmair: I do not take responsiblity if your ip gets banned/blocked for using the included scripts.