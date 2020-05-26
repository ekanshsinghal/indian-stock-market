import { SEARCH, STATUS } from '../actions/action_constants';

const defaultSearchResultsState = {
	componentState: STATUS.INITIAL,
	results: [],
};

export default function(state = defaultSearchResultsState, action) {
	switch(action.type) {
		case SEARCH.PENDING:
			return {...state, componentState: STATUS.REQUESTED};
		case SEARCH.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, results: action.payload };
		case SEARCH.REJECTED:
			return {...state, componentState: STATUS.ERROR };
		case SEARCH.CLEAR:
			return {...state, componentState: STATUS.INITIAL, results: []};
		default:
			return state;
	}
}