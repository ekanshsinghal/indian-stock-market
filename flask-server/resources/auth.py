from flask import request
from flask_jwt_extended import create_access_token
from database.models import User
from flask_restful import Resource
from datetime import timedelta
from mongoengine.queryset.visitor import Q
from mongoengine.errors import FieldDoesNotExist, NotUniqueError, DoesNotExist, ValidationError
from resources.errors import SchemaValidationError, EmailAlreadyExistsError, InternalServerError, UnauthorizedError

class SignupApi(Resource):
	def post(self):
		try:
			body		= request.get_json()
			username	= body.get('username').title()
			email		= body.get('email')
			password	= body.get('password')
			if username is None or password is None or email is None:
				raise ValidationError
			if password != body.get('password2'):
				return {'password': 'Passwords do not match.'}, 400
			if User.objects(Q(username__iexact=username) or Q(email__iexact=email)).count() > 0:
				raise NotUniqueError
			user = User(username=username, password=password, email=email)
			user.hash_password()
			user.save()

			expires		= timedelta(days=7)
			access_token= create_access_token(identity=str(user.id), expires_delta=expires)
			return  {'type': 'success', 'success': 'Login succesfull.', 'username': user.username, 'token': 'Bearer ' + access_token}, 200
		except (FieldDoesNotExist, ValidationError, ValueError) as e:
			return SchemaValidationError, 400
		except NotUniqueError:
			return EmailAlreadyExistsError, 400
		except Exception as e:
			print(e)
			return InternalServerError, 500

class LoginApi(Resource):
	def post(self):
		try:
			body		= request.get_json()
			password	= body.get('password')
			if password is None:
				return {'error': 'Email or Password invalid'}, 401

			user		= User.objects.get(username__iexact=body.get('username'))
			authorized	= user.check_password(password)
			if not authorized:
				return {'error': 'Email or Password invalid'}, 401

			expires		= timedelta(days=7)
			access_token= create_access_token(identity=str(user.id), expires_delta=expires)
			return {'type': 'success', 'success': 'Login succesfull.', 'username': user.username, 'token': 'Bearer ' + access_token}, 200
		except DoesNotExist:
			return UnauthorizedError, 401
		except Exception as e:
			print(type(e).__name__)
			print(e)
			return InternalServerError, 500