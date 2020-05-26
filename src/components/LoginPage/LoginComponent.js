import React from 'react';
import PropTypes from 'prop-types';
import { Button, CardContent, Typography, Card } from '@material-ui/core';

import CustomTextField from '../common/CustomTextField/CustomTextField';
import './LoginPage.scss';

class Login extends React.Component {

	state = {
		username: '',
		password: '',
		edited: false
	}

	componentDidMount() {
		if(this.props.authUser.token !== null) {
			this.props.history.push('/stocks');
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value, edited: true});
	};

	onSubmit = e => {
		e.preventDefault();
		const userData = {
			username: this.state.username,
			password: this.state.password
		};
		this.setState({edited: false});
		this.props.loginRequest(userData);
	}

	onBack = () => {
		this.props.cleanErrors();
		this.props.history.goBack();
	}

	render() {
		const { authUser: {error} } = this.props;

		return (
			<div className='Landing'>
				<Card className='loginContainer'>
					<CardContent>
						<Typography variant='h4' className='headerText'>
							Login
						</Typography>
						
						<form noValidate onSubmit={this.onSubmit}>
							<CustomTextField
								// autoFocus
								label="Username"
								variant="filled"
								onChange={this.onChange}
								value={this.state.email}
								error={error.email && !this.state.edited ? true : false }
								helperText={error.email && !this.state.edited ? error.email : ' '}
								id="username"
								type="username"
								style={{display: 'flex', marginBottom: '18px'}}
							/>
							<CustomTextField
								label="Password"
								variant="filled"
								onChange={this.onChange}
								value={this.state.password}
								error={error.password && !this.state.edited ? true: false}
								helperText={error.password && !this.state.edited ? error.password : ' '}
								id="password"
								type="password"
								style={{display: 'flex', marginBottom: '18px'}}
							/>
							<Button type="submit" className='Button' fullWidth>
								Login
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		)
	}
}

Login.propTypes = {
	authUser:		PropTypes.object,
	loginRequest:	PropTypes.func,
	cleanErrors:	PropTypes.func,
	history:		PropTypes.object
};

export default Login;