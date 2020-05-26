import { FETCH_HISTORY, STATUS } from '../actions/action_constants';

const defaultAdvanceChart = {
    componentState: STATUS.INITIAL,
    error: null,
	data: null
};

export default function(state = defaultAdvanceChart, action) {
	switch(action.type) {
		case FETCH_HISTORY.PENDING:
			return {...state, componentState: STATUS.REQUESTED};
		case FETCH_HISTORY.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, data: action.payload };
		case FETCH_HISTORY.REJECTED:
			return {...state, componentState: STATUS.ERROR, error: action.error };
		default:
			return state;
	}
}