from flask_mongoengine import MongoEngine
from flask_bcrypt import generate_password_hash, check_password_hash

db = MongoEngine()

def initialize_db(app):
	db.init_app(app)

class User(db.Document):
	username	= db.StringField(required=True, primary_key=True)
	email		= db.EmailField(required=True, unique=True)
	password	= db.StringField(required=True, min_length=6)
	watchlist	= db.ListField(db.StringField())

	def hash_password(self):
		self.password	= generate_password_hash(self.password).decode('utf8')
	
	def check_password(self, password):
		return check_password_hash(self.password, password)


class Script(db.DynamicDocument):
	code		= db.StringField(required=True, unique=True)
	url			= db.StringField(required=True, unique=True)
	name		= db.StringField()
	full_name	= db.StringField()
	sector		= db.StringField()
	isin		= db.StringField()
	NSEID		= db.StringField()
	BSEID		= db.IntField()
	MKTCAP		= db.DecimalField()
	PE			= db.DecimalField()
	BV			= db.DecimalField()
	DIVPR		= db.DecimalField()
	IND_PE		= db.DecimalField()
	SC_TTM		= db.DecimalField()
	FaceValue	= db.DecimalField()
	SHRS		= db.DecimalField()
	lastupd		= db.DateTimeField()


class Indicies(db.Document):
	stkexchg		= db.StringField()
	exchange		= db.StringField()
	ind_id			= db.StringField()
	history_url		= db.StringField()
	lastprice		= db.DecimalField()
	change			= db.DecimalField()
	percentchange	= db.DecimalField()
	open			= db.DecimalField()
	high			= db.DecimalField()
	low				= db.DecimalField()
	prevclose		= db.DecimalField()
	yearlyhigh		= db.DecimalField()
	yearlylow		= db.DecimalField()
	ytd				= db.DecimalField()
	lastupdated		= db.DateTimeField()
	history			= db.ListField()


class Trade(db.Document):
	code		= db.StringField(required=True)
	full_name	= db.StringField(required=True)
	trade		= db.StringField(required=True)
	user		= db.ReferenceField('User', required=True)
	qty			= db.DecimalField(required=True)
	price		= db.DecimalField(required=True)
	date		= db.DateTimeField(required=True)