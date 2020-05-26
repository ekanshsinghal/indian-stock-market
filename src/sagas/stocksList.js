import * as actions from '../actions/export_to_sagas';
import { ACTION_URLS } from '../actions/action_constants';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchStocksListSaga(action) {
	yield put(actions.stocksFetchPending());
	try {
		const response = yield axios.post(ACTION_URLS.GET_ALL_STOCKS_LIST);
		yield put(actions.stocksFetchSuccess(response.data));
	} catch (error) {
		if(String(error) === 'Error: Request failed with status code 422')
			yield put(actions.logoutUser());
		yield put(actions.stocksFetchFail(error));
	}
}