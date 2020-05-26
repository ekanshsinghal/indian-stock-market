from flask import Response
from database.models import Script, Indicies, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from mongoengine.errors import DoesNotExist
from datetime import datetime, timezone
import json

date_handler = lambda obj: (obj.timestamp()*1000 if isinstance(obj, datetime) else None)

class History(Resource):
	@jwt_required
	def post(self, code, exchange = None):
		try:
			user		= User.objects.get(username=get_jwt_identity())
		except DoesNotExist:
			return {"msg": "Signature verification failed"}, 422

		try:
			script		= Script.objects.get(code=code)
			if exchange == 'nse':
				if 'nseHist' in script and len(script.nseHist) > 0:
					response = {'name': script.name, 'hist': script.nseHist}
					return Response(json.dumps(response, default=date_handler), mimetype="application/json", status=200)
				return {'type': 'warning', 'warning': script.name + ' is not traded on NSE.'}, 200
			if exchange == 'bse':
				if 'bseHist' in script and len(script.bseHist) > 0:
					response = {'name': script.name, 'hist': script.bseHist}
					return Response(json.dumps(response, default=date_handler), mimetype="application/json", status=200)
				return {'type': 'warning', 'warning': script.name + ' is not traded on BSE.'}, 200
			if exchange == None:
				if 'nseHist' in script and len(script.nseHist) > 0:
					response = {'name': script.name, 'hist': script.nseHist}
					return Response(json.dumps(response, default=date_handler), mimetype="application/json", status=200)
				if 'bseHist' in script and len(script.bseHist) > 0:
					response = {'name': script.name, 'hist': script.bseHist}
					return Response(json.dumps(response, default=date_handler), mimetype="application/json", status=200)
				return {'type': 'warning', 'warning': script.name + ' is not traded in last 90 days.'}, 200
		except DoesNotExist:
			try:
				indicies	= Indicies.objects.get(stkexchg__iexact=code)
				response	= {'stkexchg': indicies.stkexchg, 'name': indicies.stkexchg, 'hist': indicies.history}
				return Response(json.dumps(response, default=date_handler), mimetype="application/json", status=200)
			except DoesNotExist:
				return {'type': 'error', 'error': 'Object not Found.'}, 200
		except Exception as e:
			print(type(e).__name__, e)
			return {'error': 'Internal server error'}, 500