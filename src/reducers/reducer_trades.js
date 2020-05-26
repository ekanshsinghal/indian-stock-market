import { FETCH_TRADES, STATUS } from '../actions/action_constants';

const defaultTradesState = {
	componentState: STATUS.INITIAL,
	trades: []
};

export default function(state = defaultTradesState, action) {
	switch(action.type) {
		case FETCH_TRADES.PENDING:
			return {...state, componentState: STATUS.REQUESTED};
		case FETCH_TRADES.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, trades: action.payload };
		case FETCH_TRADES.REJECTED:
			return {...state, componentState: STATUS.ERROR };
		default:
			return state;
	}
}