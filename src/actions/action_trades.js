import { FETCH_TRADES } from './action_constants';

export function requestTreades() {
	return { type: FETCH_TRADES.INITIATE };
}

export function fetchTradesPending() {
	return { type: FETCH_TRADES.PENDING };
}

export function fetchTradesSuccess(trades) {
	return { type: FETCH_TRADES.SUCCESS, payload: trades };
}

export function fetchTradesFail(error) {
	return { type: FETCH_TRADES.REJECTED, payload: error };
}