import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import jwt_decode from "jwt-decode";
import { CssBaseline, CircularProgress, Snackbar, Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import { setStateMobile, showAlert } from './actions/action_common';
import { loginSuccess, logoutUser } from './actions/actions_authenticate';
import { lightTheme, darkTheme } from './configration/theme';
import LoginPage from './components/LoginPage/LoginPageContainer';
import NavBar from './components/NavBar/NavBarContainer';
import LeftDrawer from './components/LeftDrawer/LeftDrawerContainer';
import RightDrawer from './components/RightDrawer/RightDrawerContainer';
import Dashboard from './components/Dashboard/DashboardContainer';
import Holdings from './components/Holdings/HoldingsContainer';
import TradeHistory from './components/TradeHistory/TradeHistoryContainer';
import Charts from './components/Charts/ChartsContainer';
import AdvanceCharts from './components/AdvanceCharts/AdvanceChartContainer';
import './App.scss';

class App extends React.Component {

	state = {
		darkMode: false
	};

	togleDarkMode = () => this.setState({darkMode: !this.state.darkMode});

	componentDidMount() {
		// Check for token to keep user logged in
		if (localStorage.jwtToken) {
			const token = localStorage.jwtToken;
			this.props.store.dispatch(loginSuccess({token: token}));
			const decoded = jwt_decode(token);
			const currentTime = Date.now() / 1000; // to get in milliseconds
			if (decoded.exp < currentTime) {
				this.props.store.dispatch(logoutUser());
				this.props.history.push('/login');
			}
		}
		if (/Android|webOS|iPhone|iPad/i.test(navigator.userAgent)) {
			this.props.store.dispatch(setStateMobile());
		};
	}

	renderAuthorised = (props) => {
		const { darkMode } = this.state;
		if(props.history.location.pathname === '/advance-charts')
			return <Route exact path='/advance-charts' render={(props) => <AdvanceCharts {...props} darkMode={darkMode}/>}/>

		return (<div className='App'>
			<Route render={(props) => <NavBar {...props} darkMode={darkMode} togleDarkMode={this.togleDarkMode}/>} />
			<Route render={(props) => <LeftDrawer {...props} darkMode={darkMode} />} />
			<main
				className={darkMode ? clsx('contentDark', {'contentShift': this.props.quickView}) : clsx('content', {'contentShift': this.props.quickView})}
			>
				<Switch>
					<Route exact path='/dashboard' render={(props) => <Dashboard {...props} darkMode={darkMode} />}/>
					<Route exact path='/holding' render={(props) => <Holdings {...props} darkMode={darkMode} />}/>
					<Route exact path='/trades' render={(props) => <TradeHistory {...props} darkMode={darkMode} />}/>
					<Route exact path='/charts' render={(props) => <Charts {...props} darkMode={darkMode} />}/>
					<Redirect to='/dashboard'/>
				</Switch>
			</main>
			<Route render={(props) => <RightDrawer {...props} darkMode={darkMode} />} />
		</div>)
	};

	SlideTransition(props) {
		return <Slide {...props} direction="up" />;
	}

	handleAlertClose = () => this.props.store.dispatch(showAlert(null));

	render() {
		const { store, history, authUser: {token} } = this.props;
		const { darkMode } = this.state;
		
		if( !token && localStorage.jwtToken ) {
			return <div className='App'>
				<CircularProgress/>
			</div>
		}
		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
						<CssBaseline/>
						{token ? this.renderAuthorised(this.props) : <Switch>
							<Route exact path="/login" render={(props) => <LoginPage {...props}/>} />
							<Redirect to='/login'/>
						</Switch> }
						{this.props.alert &&
							<Snackbar open={Boolean(this.props.alert)} onClose={this.handleAlertClose} autoHideDuration={5000} TransitionComponent={this.SlideTransition}>
								<MuiAlert elevation={6} variant="filled" onClose={this.handleAlertClose} severity={this.props.alert.type}>
									{this.props.alert && this.props.alert[this.props.alert.type]}
								</MuiAlert>
							</Snackbar>
						}
					</ThemeProvider>
				</ConnectedRouter>
			</Provider>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		authUser: state.authUser,
		quickView: state.common.quickView,
		alert: state.common.alert
	};
};

export default connect(mapStateToProps)(App);