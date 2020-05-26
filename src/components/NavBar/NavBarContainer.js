import { connect } from 'react-redux';
import { logoutUser } from '../../actions/actions_authenticate';
import NavBar from './NavBar';

const mapStateToProps = (state) => {
	return {
		quickView: state.common.quickView ? true : false,
		details: state.authUser.details
		// usename: state.authUser.details.name
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logoutUser: () => {
			dispatch(logoutUser());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);