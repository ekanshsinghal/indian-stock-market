import * as actions from '../actions/export_to_sagas';
import { ACTION_URLS } from '../actions/action_constants';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* registerUserSaga(action) {
	yield put(actions.registerPending());
	try {
		const response = yield axios.post(ACTION_URLS.REGISTER_USER, action.payload);
		yield put(actions.registerSuccess(response.data));
	} catch (error) {
		yield put(actions.registerError(error));
	}
}