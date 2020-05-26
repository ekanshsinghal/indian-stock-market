import { FETCH_HISTORY } from './action_constants';

export function requestHistory(reqString) {
	return { type: FETCH_HISTORY.INITIATE, payload: reqString};
}

export function historyPending() {
	return { type: FETCH_HISTORY.PENDING };
}

export function historySuccess(stockHistory) {
	return { type: FETCH_HISTORY.SUCCESS, payload: stockHistory };
}

export function historyFail(error) {
	return { type: FETCH_HISTORY.REJECTED, payload: error };
}