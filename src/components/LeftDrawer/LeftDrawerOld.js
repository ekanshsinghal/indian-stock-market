import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, InputBase, CircularProgress, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, TablePagination } from '@material-ui/core';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';

import Popover from '../common/Popover';
import { getLocaleNumber } from '../../utilities/common';
import './LeftDrawer.scss'

class LeftDrawer extends React.Component {

	state = {
		page: 0,
		popOver: null,
		popupText: ''
	}

	componentDidMount() {
		if (this.props.watchlist === null) {
			this.props.fetchWatchlist();
			this.props.fetchCommonDetails();
		}
	}

	handleChangePage = (event, newPage) => this.setState({page: newPage});

	handlePopover = (e, val) => {
		const prev_close = this.props[val].prev_close;
		const popupText = <div className='column' style={{width: 140}}>
			<Typography component='span' className={this.props[val].lastprice > prev_close ? 'green' : 'red'}>{getLocaleNumber(this.props[val].lastprice)}</Typography>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<span>Open:</span>
				<span className={this.props[val].open > prev_close ? 'green' : 'red'}>{getLocaleNumber(this.props[val].open)}</span>
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<span>High:</span>
				<span className={this.props[val].high > prev_close ? 'green' : 'red'}>{getLocaleNumber(this.props[val].high)}</span>
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<span>Low:</span>
				<span className={this.props[val].low > prev_close ? 'green' : 'red'}>{getLocaleNumber(this.props[val].low)}</span>
			</div>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<span>Change:</span>
				<span className={this.props[val].change > 0 ? 'green' : 'red'}>{getLocaleNumber(this.props[val].change)}</span>
			</div>
		</div>
		this.setState({popOver: e.currentTarget, popupText});
	}
	handlePopoverClose = () => {
		this.setState({popOver: null});
	}

	renderWatchList = () => {
		const {page} = this.state;
		const rowsPerPage = Math.floor((window.innerHeight - 159)/53);
		return this.props.watchlist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
			const [className, Arrow] = item[item.priceObj].change >= 0 ? ['green', KeyboardArrowUpRoundedIcon] : ['red', KeyboardArrowDownRoundedIcon];
			return <TableRow hover key={item.name} className={className} onClick={() => this.props.setQuickView(item)}>
				<TableCell>
					{item.name}
					<ShowChartRoundedIcon className='chart-icon'/>
				</TableCell>
				<TableCell align='right' >
					{item[item.priceObj].change.toFixed(2)}<br/>
					{/* {(item[item.priceObj].change *100/ item[item.priceObj].OPN).toFixed(2)}% */}
				</TableCell>
				<TableCell padding='none' style={{width: 24}}><Arrow/></TableCell>
				<TableCell align='right' style={{width: 84}}>
					{item[item.priceObj].price.toFixed(2)}
				</TableCell>
			</TableRow>
		});
	}

	render() {
		if(!this.props.SENSEX || this.props.watchlist === null)
			return <CircularProgress style={{margin: 'auto'}}/>

		const { popOver, popupText } = this.state;
		return (
			<Drawer variant="permanent" className='drawer' classes={{ paper: 'drawer' }}>
				<div className='pinned'>
					<div onMouseOver={e => this.handlePopover(e, 'NIFTY 50')} onMouseOut={this.handlePopoverClose}>
						<div>NIFTY 50</div>
						<div className={this.props['NIFTY 50'].change > 0 ?'green':'red'}>{this.props['NIFTY 50'].lastprice}</div>
						<div className='change'>{this.props['NIFTY 50'].percentchange + '%'}</div>
					</div>
					<div onMouseOver={e => this.handlePopover(e, 'SENSEX')} onMouseOut={this.handlePopoverClose}>
						<div>SENSEX</div>
						<div className={this.props.SENSEX.change > 0 ?'green':'red'}>{this.props.SENSEX.lastprice}</div>
						<div className='change'>{this.props.SENSEX.percentchange + '%'}</div>
					</div>
				</div>
				<TableContainer className='table-container'>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell colSpan={4} padding='none'>
									<InputBase
										placeholder='Search eg. reliance, nifty'
										className='SearchInput'
										startAdornment={<SearchRoundedIcon className='searchIcon'/>}
										fullWidth
									/>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.renderWatchList()}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					component='div'
					count={this.props.watchlist.length}
					rowsPerPage={Math.floor((window.innerHeight - 159)/53)}
					page={this.state.page}
					onChangePage={this.handleChangePage}
					labelRowsPerPage={null}
					rowsPerPageOptions={[]}
				/>
				<Popover rootRef={popOver} open={Boolean(popOver)} placement='bottom' className='text'>
					{popupText}
				</Popover>
			</Drawer>
		);
	}
}

LeftDrawer.propTypes = {
	watchlist: PropTypes.array,
	fetchWatchlist: PropTypes.func,
	setQuickView: PropTypes.func,
	removeFromWatchList: PropTypes.func,
	fetchCommonDetails: PropTypes.func,
	SENSEX: PropTypes.object,
	'NIFTY 50': PropTypes.object
};

export default LeftDrawer;