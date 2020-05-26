import { FETCH_ALL_STOCKS, STATUS } from '../actions/action_constants';

const defaultStocksListState = {
	componentState: STATUS.INITIAL,
	stocksList: null
};

export default function(state = defaultStocksListState, action) {
	switch(action.type) {
		case FETCH_ALL_STOCKS.PENDING:
			return {...state, componentState: STATUS.REQUESTED};
		case FETCH_ALL_STOCKS.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, stocksList: action.payload };
		case FETCH_ALL_STOCKS.REJECTED:
			return {...state, componentState: STATUS.ERROR };
		default:
			return state;
	}
}