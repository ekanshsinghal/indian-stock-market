import { SEARCH } from './action_constants';

export function searchStocks(serachString) {
	return { type: SEARCH.INITIATE, payload: serachString};
}

export function stocksSearchPending() {
	return { type: SEARCH.PENDING };
}

export function stocksSearchSuccess(stocksList) {
	return { type: SEARCH.SUCCESS, payload: stocksList };
}

export function stocksSearchFail(error) {
	return { type: SEARCH.REJECTED, payload: error };
}

export function clearStockSearchResults() {
	return { type: SEARCH.CLEAR };
}