from flask import Response, request
from database.models import User, Script, Indicies
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from mongoengine.errors import DoesNotExist
from mongoengine.queryset.visitor import Q
import json

class Search(Resource):
	@jwt_required
	def post(self, searchStr):
		try:
			user		= User.objects.get(username=get_jwt_identity())
		except DoesNotExist:
			return {"msg": "Signature verification failed"}, 422
		
		try:
			scripts		= Script.objects.filter(Q(name__istartswith=searchStr) | Q(full_name__istartswith=searchStr)).only('code', 'name', 'full_name', 'priceObj').exclude('id').as_pymongo()
			indicies	= Indicies.objects(stkexchg__istartswith=searchStr).only('stkexchg', 'exchange').exclude('id').as_pymongo()
			results		= []
			for i in indicies:
				results.append({'stkexchg': i['stkexchg'], 'index': i['exchange'], 'full_name': i['stkexchg']})
			results.extend(scripts)

			return results, 200
		except Exception as e:
			print(type(e).__name__, e)
			return {'error': 'Internal server error'}, 500