import * as actions from '../actions/export_to_sagas';
import { ACTION_URLS } from '../actions/action_constants';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchWatchlistSaga(action) {
	yield put(actions.watchlistPending());
	try {
		const response = yield axios.post(ACTION_URLS.WATCHLIST);
		yield put(actions.watchlistSuccess(response.data));
	} catch (error) {
		if(String(error) === 'Error: Request failed with status code 422')
			yield put(actions.logoutUser());
		yield put(actions.watchlistFail(error));
	}
}

export function* updateWatchlist(action) {
	try {
		let url = ACTION_URLS.WATCHLIST + '/' + action.operation + '/' + action.payload;
		if (action.index) {
			url += '/' + action.index;
		}
		const response = yield axios.post(url);
		yield put(actions.showAlert(response.data));
		yield put(actions.requestWatchlist());
	} catch (error) {
		if(String(error) === 'Error: Request failed with status code 422')
			yield put(actions.logoutUser());
		console.log(error);
	}
}