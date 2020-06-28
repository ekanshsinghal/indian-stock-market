from dotenv import load_dotenv
from os import getenv
from flask import Flask, redirect, url_for
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from database.models import initialize_db
from flask_restful import Api
from resources.routes import initialize_routes
from resources.errors import errors

load_dotenv()
app = Flask(__name__, static_folder='../build', static_url_path='/')
app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY')

api = Api(app, errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.config['MONGODB_SETTINGS'] = {
	'host': 'mongodb://localhost/stock_exchange'
}

@app.route('/')
def index():
	return app.send_static_file('index.html')

@app.errorhandler(404)
def page_not_found(e):
	return redirect(url_for('index'))

initialize_db(app)
initialize_routes(api)

if __name__ == "__main__":
	app.run(port=57597)