import { FETCH_PORTFOLIO, STATUS } from '../actions/action_constants';

const defaultPortfolioState = {
	componentState:	STATUS.INITIAL,
	currVal:		null,
	holding:		null,
	investment:		null,
	pl:				null,
	realisedPL:		null,
	daily_net_change: null,
	scripts:		[]
};

export default function(state = defaultPortfolioState, action) {
	switch(action.type) {
		case FETCH_PORTFOLIO.PENDING:
			return {...state, componentState: STATUS.REQUESTED};
		case FETCH_PORTFOLIO.SUCCESS:
			return {...state, componentState: STATUS.AVAILABLE, currVal: action.payload.currVal, holding: action.payload.holding, investment: action.payload.investment, pl: action.payload.pl, realisedPL: action.payload.realisedPL, daily_net_change: action.payload.daily_net_change, scripts: action.payload.scripts};
		case FETCH_PORTFOLIO.REJECTED:
			return {...state, componentState: STATUS.ERROR};
		default:
			return state;
	}
}