# stock-market-analyzer

Scrapes Indian stock echanges(NSE and BSE) data off moneycontrol and represents in a comprehesive app.

## Requirements

1. Python 3.6+ with pip
2. Mongodb
3. npm (Node package manager)

## Steps to start

### 1. Install Dependencies

```
cd <proj_dir>
npm install
npm run build
```

2. `python -m venv venv`
3. Activate virtual env using one of the following commands -  
   Windows CMD - `./venv/Scripts/active.bat`  
   Windows PowerShell - `./venv/Scripts/active.ps1`
4.

```
pip install requirements.txt
cd flask-server/database
python initialize_moneycontrol.py [1 time only, will take a few hours].
python update_moneycontrol.py
cd ..
python app.py
```

Disclaimer: I do not take responsiblity if your ip gets banned/blocked for using the included scripts.
