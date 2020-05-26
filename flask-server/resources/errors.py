InternalServerError = {
	"error": "Something went wrong"
}

SchemaValidationError = {
	"error": "Request is missing required fields"
}

EmailAlreadyExistsError = {
	"error": "User with given email address/username already exists"
}

UnauthorizedError = {
	"error": "Invalid username or password"
}

errors = {
	"SchemaValidationError": {
		"message":	"Request is missing required fields",
		"status":	400
	},
	 "UpdatingMovieError": {
		"message":	"Updating movie added by other is forbidden",
		"status":	403
	},
	 "DeletingMovieError": {
		"message":	"Deleting movie added by other is forbidden",
		"status":	403
	},
	 "MovieNotExistsError": {
		"message":	"Movie with given id doesn't exists",
		"status":	400
	},
	 "EmailAlreadyExistsError": {
		"message":	"User with given email address already exists",
		"status":	400
	},
	 "UnauthorizedError": {
		"message":	"Invalid username or password",
		"status":	401
	}
}