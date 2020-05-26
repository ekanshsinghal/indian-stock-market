import * as actions from '../actions/export_to_sagas';
import { ACTION_URLS } from '../actions/action_constants';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* loginUserSaga(action) {
	yield put(actions.loginPending());
	try {
		const response = yield axios.post(ACTION_URLS.LOGIN_USER, action.payload);
		yield put(actions.showAlert(response.data));
		if(response.data.error) {
			yield put(actions.logoutUser());
		} else {
			yield put(actions.loginSuccess(response.data));
		}
	} catch (error) {
		if(String(error) === 'Error: Request failed with status code 422')
			yield put(actions.logoutUser());
		yield put(actions.loginError(error));
	}
}