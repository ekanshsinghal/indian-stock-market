import { FETCH_WATCHLIST, STATUS } from '../actions/action_constants';

const defaultWatchistState = {
	componentState: STATUS.INITIAL,
	watchlist: null
};

export default function(state = defaultWatchistState, action) {
	switch(action.type) {
		case FETCH_WATCHLIST.PENDING:
			return {...state, componentState: STATUS.REQUESTED};
		case FETCH_WATCHLIST.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, watchlist: action.payload };
		case FETCH_WATCHLIST.REJECTED:
			return {...state, componentState: STATUS.ERROR };
		default:
			return state;
	}
}