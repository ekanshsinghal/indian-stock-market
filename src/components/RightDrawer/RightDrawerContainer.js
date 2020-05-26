import { connect } from 'react-redux';
import { setQuickView } from '../../actions/action_common';
import { requestHistory } from '../../actions/action_adv_chart';
import RightDrawer from './RightDrawer';

const mapStateToProps = (state) => {
	return {
		quickView: state.common.quickView,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		closeQuickView: () => {
			dispatch(setQuickView(null));
		},
		requestHistory: (reqString) => {
			dispatch(requestHistory(reqString));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RightDrawer);