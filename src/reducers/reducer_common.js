import { SET_STATE_MOBILE, SET_QUICK_VIEW, FETCH_COMMON_DETAILS, STATUS, SHOW_ALERT } from '../actions/action_constants';

const common = {
	componentState: STATUS.INITIAL,
	mobile: false,
	quickView: null,
	'NIFTY 50': null,
	SENSEX: null,
	alert: null
};

export default function(state = common, action) {
	switch(action.type) {
		case SET_STATE_MOBILE:
			return {...state, mobile: true};
		case SET_QUICK_VIEW:
			return {...state, quickView: action.payload};
		case SHOW_ALERT:
			return {...state, alert: action.payload};
		case FETCH_COMMON_DETAILS.PENDING:
			return {...state, componentState: STATUS.PENDING};
		case FETCH_COMMON_DETAILS.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, SENSEX: action.payload.SENSEX, 'NIFTY 50': action.payload['NIFTY 50']};
		case FETCH_COMMON_DETAILS.REJECTED:
			return {...state, componentState: STATUS.ERROR}
		default:
			return state;
	}
}