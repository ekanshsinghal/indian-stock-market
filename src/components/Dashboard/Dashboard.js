import React from 'react';
import PropTypes from 'prop-types';
import { Typography, SvgIcon, CircularProgress, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { ReactComponent as Briefcase } from '../../assets/icons/briefcase-outline.svg';
import { ReactComponent as TrendingUp } from '../../assets/icons/trending-up-outline.svg'

import TreeMap from './TreeMap';
import MarketOverview from './MarketOverview';
import Popover from '../common/Popover';
import { getLocaleNumber, getShortNumber } from '../../utilities/common';
import { getTreeMapObj } from '../../utilities/treemap';
import './Dashboard.scss';

class Dashboard extends React.Component {
	state={
		radioValue: 'currVal',
		popOver: null,
		popupText: ''
	};

	componentDidMount() {
		if(!this.props.investment) {
			this.props.fetchPortfolio();
		}
	}

	handleRadioChange = e => this.setState({radioValue: e.target.value});
	handlePopover = (e, val) => {
		let popupText;
		switch(val) {
			case 'pl':
				popupText = <Typography className={this.props.pl > 0 ? 'green' : 'red'}>₹ {getLocaleNumber(this.props.pl)} ({getLocaleNumber(this.props.daily_net_change)})</Typography>
				break;
			case 'currVal':
				popupText = <Typography>₹ {getLocaleNumber(this.props.currVal)}</Typography>
				break;
			case 'investment':
				popupText = <Typography>₹ {getLocaleNumber(this.props.investment)}</Typography>
				break;
			default: break;
		}
		this.setState({popOver: e.currentTarget, popupText});
	}
	handlePopoverClose = () => {
		this.setState({popOver: null});
	}

	render() {
		const { holding, pl, investment, currVal, scripts, daily_net_change } = this.props;
		const { popOver, popupText } = this.state;

		if(holding === null || ! this.props.nifty) {
			return <CircularProgress style={{margin: 'auto'}}/>
		}
		const overviewWidth = this.props.quickView ? (window.innerWidth - 854)/2 : (window.innerWidth - 504)/2;

		return <div className={this.props.darkMode ? 'Dashboard-Dark' : 'Dashboard'}>
			<Typography variant='h5' className='greeting'>Hi, {this.props.details.identity}</Typography>
			{investment !== 0 ? <div className='holding-overview'>
				<SvgIcon component={Briefcase} viewBox="0 0 512 512" htmlColor='#f00'/>
				<Typography variant='subtitle1' className='subtitle'>
					{'Holdings  (' + holding + ')'}
				</Typography>
				<div className='row'>
					<div className='column first'>
						<Typography
							variant='h3'
							component='span'
							className={pl>0? 'green light':'red light'}
							onMouseEnter={e => this.handlePopover(e, 'pl')}
							onMouseLeave={this.handlePopoverClose}
						> ₹ {getShortNumber(pl)} ({getShortNumber(daily_net_change)})</Typography>
						<span className='light'>{Math.round(pl *100/investment)}%</span>
						<Typography className='light label'>P&L</Typography>
					</div>
					<div className='column second'>
						<div className='row'>
							<Typography component='span' className='light label'>Current Value</Typography>
							<Typography component='span' className='light' onMouseEnter={e => this.handlePopover(e, 'currVal')} onMouseLeave={this.handlePopoverClose}>₹ {getShortNumber(currVal)}</Typography>
						</div>
						<div className='row'>
							<Typography component='span' className='light label'>Investment</Typography>
							<Typography component='span' className='light' onMouseEnter={e => this.handlePopover(e, 'investment')} onMouseLeave={this.handlePopoverClose}>₹ {getShortNumber(investment)}</Typography>
						</div>
					</div>
				</div>
				<div className='row treemap-container'>
					<TreeMap root={getTreeMapObj(scripts, this.state.radioValue)}/>
				</div>
				<div className='row radio-container'>
					<RadioGroup value={this.state.radioValue} onChange={this.handleRadioChange} style={{display: 'inline'}}>
						<FormControlLabel value="currVal" control={<Radio/>} label="Current Value"/>
						<FormControlLabel value="invVal" control={<Radio/>} label="Investment Value"/>
						<FormControlLabel value="pl" control={<Radio/>} label="P&L"/>
					</RadioGroup>
				</div>
			</div> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400}}> You have no holdings.</div>}
			<div className='holding-overview'>
				<SvgIcon component={TrendingUp} viewBox="0 0 512 512" htmlColor='#f00'/>
				<Typography variant='subtitle1' className='subtitle'>
					Market Overview
				</Typography>
				<div className='row treemap-container'>
					<MarketOverview id={this.props.nifty.stkexchg} data={this.props.nifty.history} width={overviewWidth}/>
					<MarketOverview id={this.props.sensex.stkexchg} data={this.props.sensex.history} width={overviewWidth}/>
				</div>
			</div>
			<Popover rootRef={popOver} open={Boolean(popOver)} placement='top' className='text'>
				{popupText}
			</Popover>
		</div>
	}
}

Dashboard.propTypes = {
	fetchPortfolio: PropTypes.func,
	details:        PropTypes.object,
	currVal:        PropTypes.number,
	holding:        PropTypes.number,
	investment:     PropTypes.number,
	pl:             PropTypes.number,
	realisedPL:     PropTypes.number,
	scripts:        PropTypes.array,
	nifty:			PropTypes.object,
	sensex:			PropTypes.object,
};

export default Dashboard;