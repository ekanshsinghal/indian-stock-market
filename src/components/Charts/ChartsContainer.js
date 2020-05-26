import { connect } from 'react-redux';
import { requestHistory } from '../../actions/action_adv_chart';
import { searchStocks, clearStockSearchResults } from '../../actions/action_search';
import Charts from './Charts';

const mapStateToProps = (state) => {
	return {
		adv_chart_data:	state.advance_chart.data,
		componentState: state.advance_chart.componentState,
		quickView: Boolean(state.common.quickView),
		searchResults: state.searchResults.results
	};
};

const mapDispatchToProps = dispatch => {
	return {
		requestHistory: reqString => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Charts);