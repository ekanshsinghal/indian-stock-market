import React from 'react';
import { Drawer, IconButton, SvgIcon, Typography, Grid } from '@material-ui/core';
import { ReactComponent as Close } from '../../assets/icons/close-outline.svg';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import { format } from 'date-fns';

import Switch from '../common/Switch';
import { getLocaleNumber, getShortNumber } from '../../utilities/common';
import './RightDrawer.scss';

const GridItem = props => {
	return <Grid item className='GridItem'>
		<Typography variant='subtitle2'>{props.label}</Typography>
		<Typography variant='body1' className={`Divider ${props.color}`}>{props.value}</Typography>
	</Grid>
}

export default class RightDrawer extends React.Component {

	state = {
		priceObj: null,
		name: null
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.quickView && nextProps.quickView.name !== prevState.name) {
			return {name: nextProps.quickView.name, priceObj: nextProps.quickView.priceObj}
		}
		return null;
	}

	toggleExchange = () => {
		this.setState({priceObj: this.state.priceObj === 'nse' ? 'bse' : 'nse'});
	};

	requestHistory = (code) => {
		this.props.requestHistory(code);
		this.props.history.push('/charts')
	}

	closeQuickView = () => {
		this.setState({priceObj: null});
		this.props.closeQuickView();
	}

	render() {
		const { priceObj } = this.state;

		if (!priceObj) return null;
		
		const stock = this.props.quickView;
		const color = stock[priceObj].change < 0 ? 'red' : 'green';
		const price = stock[priceObj].price;

		return (
			<Drawer
				className='RightDrawer'
				variant='persistent'
				anchor='right'
				open={true}
				classes={{
					paper: 'DrawerPapaer'
				}}
			>
				<div className='row'>
					<div className='column'/>
					<IconButton onClick={this.closeQuickView} size='small'>
						<SvgIcon component={Close} viewBox="0 0 512 512" htmlColor='#f00'/>
					</IconButton>
				</div>
				<div className='row'>
					<Typography variant='h6' className='column'>{stock.name}</Typography>
					<span>
						<Typography component='span' style={{fontSize: 12, color: stock.nse ? '#212121':'#999'}}>NSE</Typography>
						<Switch
							checked={priceObj === 'bse'}
							onChange={this.toggleExchange}
							value='exchange'
							disabled = {!stock.nse || !stock.bse}
						/>
						<Typography component='span' style={{fontSize: 12, color: stock.bse ? '#212121':'#999'}}>BSE</Typography>
					</span>
				</div>
				<Typography variant='subtitle1'>{stock.sector}</Typography>

				<div className={`row ${color}`}>
					<Typography variant='h3'>{getLocaleNumber(price)}</Typography>
					<div className='column' style={{paddingTop: 8, paddingLeft: 8}}>
						<Typography variant='subtitle2'>{getLocaleNumber(stock[priceObj].change)}</Typography>
						<Typography variant='subtitle2'>{getLocaleNumber(stock[priceObj].pricepercentchange)} %</Typography>
					</div>
				</div>
				
				<div className='row Divider'>
					<Typography variant='subtitle1' className='column'>Vol: {getShortNumber(stock[priceObj].VOL)}</Typography>
					<ShowChartRoundedIcon className='chart-icon' onClick={() => this.requestHistory(stock.code)}/>
				</div>
				Last Upd: {format(Date.parse(stock.lastupd), 'MMM dd, hh:mm a')}

				<Grid container spacing={2} className='Seperator'>
					<GridItem label='HIGH' value={getLocaleNumber(stock[priceObj].HP)} color='green'/>
					<GridItem label='LOW' value={getLocaleNumber(stock[priceObj].LP)} color='red'/>
					<GridItem label='OPEN' value={getLocaleNumber(stock[priceObj].OPN)}/>
					<GridItem label='PREV CLOSE' value={getLocaleNumber(stock[priceObj].prev_close)}/>
					<GridItem label='52W HIGH' value={getLocaleNumber(stock[priceObj]['52H'])}/>
					<GridItem label='52W LOW' value={getLocaleNumber(stock[priceObj]['52L'])} />
					<GridItem label='30 Day Avg' value={getLocaleNumber(stock['30DayAvg'])} color={stock['30DayAvg'] < price ? 'green' : 'red'}/>
					<GridItem label='50 Day Avg' value={getLocaleNumber(stock['50DayAvg'])} color={stock['50DayAvg'] < price ? 'green' : 'red'}/>
					<GridItem label='150 Day Avg' value={getLocaleNumber(stock['150DayAvg'])} color={stock['150DayAvg'] < price ? 'green' : 'red'}/>
					<GridItem label='200 Day Avg' value={getLocaleNumber(stock['200DayAvg'])} color={stock['200DayAvg'] < price ? 'green' : 'red'}/>
				</Grid>

				<Typography variant='h6' className='Divider Seperator' style={{marginBottom: 8}}>Statistics</Typography>
				<Grid container spacing={2}>
					<GridItem label='MKT CAP(₹ Cr)' value={getLocaleNumber(stock.MKTCAP)}/>
					<GridItem label='EPS (TTM)' value={getLocaleNumber(stock.SC_TTM)}/>
					<GridItem label='DIVIDEND (%)' value={getLocaleNumber(stock.DIVPR)}/>
					<GridItem label='P/E' value={getLocaleNumber(stock.DIVPR)}/>
					<GridItem label='FACE VALUE (₹)' value={getLocaleNumber(stock.FaceValue)}/>
					<GridItem label='BOOK VALUE (₹)' value={getLocaleNumber(stock.BV)}/>
					<GridItem label='INDUSTRY P/E' value={getLocaleNumber(stock.IND_PE)}/>
					<GridItem label='EQUITY' value={getShortNumber(stock.SHRS)}/>
				</Grid>
			</Drawer>
		)
	}
}