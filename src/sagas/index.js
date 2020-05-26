import { takeEvery } from 'redux-saga/effects';
import { fetchStocksListSaga } from './stocksList';
import { loginUserSaga } from './loginUser';
import { registerUserSaga } from './registerUser';
import { fetchCommonDetailsSaga } from './commonDetails';
import { fetchSearchListSaga } from './search';
import { fetchPortfolioSaga, addToPortfolio } from './portfolio';
import { fetchWatchlistSaga, updateWatchlist } from './watchlist';
import { fetchHistorySaga } from './requestHistory';
import { fetchTradesSaga } from './tradesHistory';
import * as actionTypes from '../actions/action_constants';

export function* sagaListener() {
	yield takeEvery(actionTypes.FETCH_COMMON_DETAILS.INITIATE, fetchCommonDetailsSaga);

	yield takeEvery(actionTypes.SEARCH.INITIATE, fetchSearchListSaga);
	
	yield takeEvery(actionTypes.FETCH_TRADES.INITIATE, fetchTradesSaga);
	
	yield takeEvery(actionTypes.FETCH_WATCHLIST.INITIATE, fetchWatchlistSaga);
	yield takeEvery(actionTypes.FETCH_WATCHLIST.UPDATE, updateWatchlist);

	yield takeEvery(actionTypes.FETCH_PORTFOLIO.INITIATE, fetchPortfolioSaga);
	yield takeEvery(actionTypes.FETCH_PORTFOLIO.ADD, addToPortfolio);

	yield takeEvery(actionTypes.FETCH_ALL_STOCKS.INITIATE, fetchStocksListSaga);

	yield takeEvery(actionTypes.FETCH_HISTORY.INITIATE, fetchHistorySaga);

	yield takeEvery(actionTypes.LOGIN_USER.INITIATE, loginUserSaga);
	
	yield takeEvery(actionTypes.REGISTER_USER.INITIATE, registerUserSaga);
}