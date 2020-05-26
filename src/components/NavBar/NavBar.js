import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Menu, MenuItem, ListItemText, ListItemSecondaryAction, Button, Avatar } from '@material-ui/core';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
// import MoreIcon from '@material-ui/icons/MoreVert';

import Toggle from '../common/Toggle';
import './NavBar.scss';

class NavBar extends React.Component {	
	state = {
		open: null
	};

	onClickLogout = () => {
		this.handleMenuClose();
		this.props.logoutUser();
	}

	handleMenu = e => this.setState({open: e.currentTarget});
	handleMenuClose = () => this.setState({open: null});

	onButtonClick = path => {
		this.props.history.push(path);
	}

	render() {
		const {open} = this.state;
		if (!this.props.details) {
			return null
		}
		return (
			<AppBar position="fixed" className={this.props.darkMode ? 'appBar-Dark' : 'appBar'}>
				<Toolbar>
					<div className='column'/>
					<Button className={window.location.pathname === '/dashboard'?'Button-selected' : 'button'} onClick={() => this.onButtonClick('/dashboard')}>Dashboard</Button>
					<Button className={window.location.pathname === '/holding'?'Button-selected' : 'button'} onClick={() => this.onButtonClick('/holding')}>Holdings</Button>
					<Button className={window.location.pathname === '/trades'?'Button-selected' : 'button'} onClick={() => this.onButtonClick('/trades')}>Trade History</Button>
					<Button className={window.location.pathname === '/charts'?'Button-selected' : 'button'} onClick={() => this.onButtonClick('/charts')}>Charts</Button>
					{/* <IconButton edge='end' color='inherit' onClick={this.handleMenuOpen}>
						{this.props.details.name}
						<MoreIcon/>
					</IconButton> */}
					<Button 
						startIcon={<Avatar className='avatar'>{this.props.details.identity.charAt(0)}</Avatar>}
						onClick={this.handleMenu}
						className='menu-button'
					>
						{this.props.details.identity}
					</Button>
					<Menu
						anchorEl={open}
						anchorOrigin={{ vertical: "bottom", horizontal: "right"}}
						transformOrigin={{ vertical: "top", horizontal: "right" }}
						getContentAnchorEl={null}
						onClose={this.handleMenuClose}
						open={Boolean(open)}
						classes={{
							paper: 'paper',
						}}
					>
						<MenuItem onClick={this.props.togleDarkMode}>
							<ListItemText primary='Dark Mode'/>
							<ListItemSecondaryAction>
								<Toggle checked={this.props.darkMode} onChange={this.props.togleDarkMode}/>
							</ListItemSecondaryAction>
						</MenuItem>
						<MenuItem onClick={this.onClickLogout}>
							<ListItemText primary='Log out'/>
							<ListItemSecondaryAction>
								<ExitToAppRoundedIcon/>
							</ListItemSecondaryAction>
						</MenuItem>
					</Menu>
					{this.props.quickView ? <div style={{width: 350}}/> : null}
				</Toolbar>
			</AppBar>
		);
	}
}

NavBar.propTypes = {
	quickView: PropTypes.bool,
	details: PropTypes.object,
	logoutUser: PropTypes.func,
	history: PropTypes.object
};

export default NavBar;