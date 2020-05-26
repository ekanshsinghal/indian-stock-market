import * as actions from '../actions/export_to_sagas';
import { ACTION_URLS } from '../actions/action_constants';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchHistorySaga(action) {
	yield put(actions.historyPending());
	try {
		const response = yield axios.post(ACTION_URLS.FETCH_HISTORY_URL + action.payload);
		yield put(actions.historySuccess(response.data));
	} catch (error) {
		if(String(error) === 'Error: Request failed with status code 422')
			yield put(actions.logoutUser());
		yield put(actions.historyFail(error));
	}
}