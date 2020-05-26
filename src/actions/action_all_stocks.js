import { FETCH_ALL_STOCKS } from './action_constants';

export function requestAllStocks() {
	return { type: FETCH_ALL_STOCKS.INITIATE };
}

export function stocksFetchPending() {
	return { type: FETCH_ALL_STOCKS.PENDING };
}

export function stocksFetchSuccess(stocksList) {
	return { type: FETCH_ALL_STOCKS.SUCCESS, payload: stocksList };
}

export function stocksFetchFail(error) {
	return { type: FETCH_ALL_STOCKS.REJECTED, payload: error };
}