import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loginRequest, cleanErrors } from '../../actions/actions_authenticate';
import Login from './LoginComponent';

const mapStateToProps = (state) => {
	return {
		authUser:	state.authUser,
		router:		state.router
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginRequest: (user) => {
			dispatch(loginRequest(user));
		},
		cleanErrors: () => {
			dispatch(cleanErrors());
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));