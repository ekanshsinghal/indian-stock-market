import { connect } from 'react-redux';
import { requestPortfolio } from '../../actions/action_portfolio';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => {
	return {
		details:	state.authUser.details,
		currVal:	state.portfolio.currVal,
		holding:	state.portfolio.holding,
		investment:	state.portfolio.investment,
		pl:			state.portfolio.pl,
		realisedPL:	state.portfolio.realisedPL,
		daily_net_change: state.portfolio.daily_net_change,
		scripts:	state.portfolio.scripts,
		nifty:		state.common['NIFTY 50'],
		sensex:		state.common.SENSEX,
		quickView:	Boolean(state.common.quickView)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchPortfolio: () => {
			dispatch(requestPortfolio());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);