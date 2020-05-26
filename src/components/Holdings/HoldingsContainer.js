import { connect } from 'react-redux';
import { requestPortfolio, addPortfolio } from '../../actions/action_portfolio';
import { setQuickView, showAlert } from '../../actions/action_common';
import { requestHistory } from '../../actions/action_adv_chart';
import { searchStocks, clearStockSearchResults } from '../../actions/action_search';
import Holdings from './Holdings';

const mapStateToProps = (state) => {
	return {
		details:	state.authUser.details,
		portfolio:	state.portfolio,
		searchResults: state.searchResults.results
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPortfolio: () => {
			dispatch(requestPortfolio());
		},
		addToPortfolio: params => {
			dispatch(addPortfolio(params));
		},
		setQuickView: item => {
			dispatch(setQuickView(item));
		},
		showAlert: message => {
			dispatch(showAlert(message));
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

export default connect(mapStateToProps, mapDispatchToProps)(Holdings);