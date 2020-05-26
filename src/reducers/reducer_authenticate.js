import { LOGIN_USER, REGISTER_USER, STATUS } from '../actions/action_constants';

const defaultLoginState = {
	loginState: STATUS.INITIAL,
	token: null,
	details: null,
	error: {
		email: null,
		password: null
	}
}

export default function(state = defaultLoginState, action) {
	switch(action.type) {
		case LOGIN_USER.PENDING:
		case REGISTER_USER.PENDING:
			return {...state, loginState: STATUS.REQUESTED };
		case LOGIN_USER.REJECTED:
		case REGISTER_USER.REJECTED:
			return {...state, loginState: STATUS.INITIAL, token: null, details: null };
		case LOGIN_USER.SUCCESS:
		case REGISTER_USER.SUCCESS:
			return {...state, loginState: STATUS.AVAILABLE, token: action.token, details: action.payload };
		case LOGIN_USER.LOGOUT:
			return {...state, loginState: STATUS.INITIAL, token: null, details: null };
		case LOGIN_USER.CLEAN_ERROR:
			return {...state, error: {
				email: null,
				password: null,
			} }
		default:
			return state;
	}
}