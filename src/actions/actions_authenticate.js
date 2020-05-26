import { LOGIN_USER, REGISTER_USER } from './action_constants';
import setAuthToken from '../configration/setAuthToken';
import jwt_decode from "jwt-decode";

export function loginRequest(user) {
	return { type: LOGIN_USER.INITIATE, payload: user };
}

export function loginPending() {
	return { type: LOGIN_USER.PENDING };
}

export function loginSuccess(response) {
	const decoded = jwt_decode(response.token);
	localStorage.setItem('jwtToken', response.token)
	setAuthToken(response.token);
	return { type: LOGIN_USER.SUCCESS, token: response.token, payload: decoded };
}

export function loginError(error) {
	return { type: LOGIN_USER.REJECTED, payload: error.response.data }
}

export function logoutUser() {
	localStorage.removeItem("jwtToken");
	setAuthToken();
	return { type: LOGIN_USER.LOGOUT };
}

export function registerRequest(user) {
	return { type: REGISTER_USER.INITIATE, payload: user };
}

export function registerPending() {
	return { type: REGISTER_USER.PENDING };
}

export function registerSuccess(response) {
	const decoded = jwt_decode(response.token);
	localStorage.setItem('jwtToken', response.token)
	setAuthToken(response.token);
	return { type: REGISTER_USER.SUCCESS, token: response.token, payload: decoded };
}

export function registerError(error) {
	return { type: REGISTER_USER.REJECTED, payload: error.response.data }
}

export function cleanErrors() {
	return { type: LOGIN_USER.CLEAN_ERROR };
}