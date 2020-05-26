import { connect } from 'react-redux';
import { requestHistory } from '../../actions/action_adv_chart';
import AdvanceCharts from './AdvanceCharts';

const mapStateToProps = (state) => {
	return {
		adv_chart_data:	state.advance_chart.data
	};
};

const mapDispatchToProps = dispatch => {
	return {
		requestHistory: (reqString) => {
			dispatch(requestHistory(reqString));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceCharts);