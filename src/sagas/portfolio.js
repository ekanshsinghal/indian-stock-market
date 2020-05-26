import * as actions from '../actions/export_to_sagas';
import { ACTION_URLS } from '../actions/action_constants';
import { put } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchPortfolioSaga(action) {
	yield put(actions.portfolioPending());
	try {
		const response = yield axios.post(ACTION_URLS.PORTFOLIO);
		yield put(actions.portfolioSuccess(response.data));
	} catch (error) {
		yield put(actions.portfolioFail(error));
	}
}

export function* addToPortfolio(action) {
    try {
        const response = yield axios.post(ACTION_URLS.ADD_TO_PORTFOLIO, action.payload);
		yield put(actions.showAlert(response.data));
        yield put(actions.requestPortfolio());
    } catch (error) {
		if(String(error) === 'Error: Request failed with status code 422')
			yield put(actions.logoutUser());
		yield put(actions.showAlert({type: 'error', error}));
        console.log(error);
    }
}