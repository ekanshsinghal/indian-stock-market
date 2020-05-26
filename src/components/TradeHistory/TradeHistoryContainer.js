import { connect } from 'react-redux';
import { requestTreades } from '../../actions/action_trades';
import { searchStocks, clearStockSearchResults } from '../../actions/action_search';
import TradeHistory from './TradeHistory';

const mapStateToProps = (state) => {
	return {
		details:	state.authUser.details,
		trades:		state.trades,
		searchResults:	state.searchResults.results
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchTradeHistory: () => {
			dispatch(requestTreades());
		},
		fetchStockList: searchStr => {
			dispatch(searchStocks(searchStr));
		},
		clearStockSearchResults: () => {
			dispatch(clearStockSearchResults());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory);