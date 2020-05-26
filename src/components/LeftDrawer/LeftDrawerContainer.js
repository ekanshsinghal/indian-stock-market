import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchStocks, clearStockSearchResults } from '../../actions/action_search';
import { requestWatchlist, updateWatchList } from '../../actions/action_watchlist';
import { setQuickView, requestCommonDetails } from '../../actions/action_common';
import { requestHistory } from '../../actions/action_adv_chart';
import LeftDrawer from './LeftDrawer';

const mapStateToProps = (state) => {
	return {
		watchlist: state.watchList.watchlist,
		SENSEX: state.common.SENSEX,
		'NIFTY 50': state.common['NIFTY 50'],
		searchResults: state.searchResults.results
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchCommonDetails: () => {
			dispatch(requestCommonDetails());
		},
		fetchWatchlist: () => {
			dispatch(requestWatchlist());
		},
		updateWatchList: (operation, code, index) => {
			dispatch(updateWatchList(operation, code, index));
		},
		setQuickView: item => {
			dispatch(setQuickView(item));
		},
		requestHistory: (reqString) => {
			dispatch(requestHistory(reqString));
		},
		fetchStockList: searchStr => {
			dispatch(searchStocks(searchStr));
		},
		clearStockSearchResults: () => {
			dispatch(clearStockSearchResults());
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftDrawer));