import { FETCH_WATCHLIST } from './action_constants';

export function requestWatchlist() {
	return { type: FETCH_WATCHLIST.INITIATE };
}

export function watchlistPending() {
	return { type: FETCH_WATCHLIST.PENDING };
}

export function watchlistSuccess(stocksList) {
	return { type: FETCH_WATCHLIST.SUCCESS, payload: stocksList };
}

export function watchlistFail(error) {
	return { type: FETCH_WATCHLIST.REJECTED, payload: error };
}

export function updateWatchList(operation, code, index) {
	return { type: FETCH_WATCHLIST.UPDATE, payload: code, operation, index}
}