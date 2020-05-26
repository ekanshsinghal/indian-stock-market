import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import stocksList from './reducer_stocks_list';
import searchResults from './reducer_search_results';
import authUser from './reducer_authenticate';
import common from './reducer_common';
import watchList from './reducer_watchlist';
import portfolio from './reducer_portfolio';
import advance_chart from './reducer_advance_chart';
import trades from './reducer_trades';

const rootReducer = (history) => combineReducers({
	router: connectRouter(history),
	stocksList,
	authUser,
	common,
	searchResults,
	watchList,
	portfolio,
	advance_chart,
	trades
});

export default rootReducer;