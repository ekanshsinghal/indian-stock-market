import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, CircularProgress, TableContainer, Table, TableBody, TableRow, TableCell, Typography, TextField, Button } from '@material-ui/core';
import { format } from 'date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

import Popover from '../common/Popover';
import { getLocaleNumber, getShortNumber } from '../../utilities/common';
import './LeftDrawer.scss'

class LeftDrawer extends React.Component {

	state = {
		popOver: null,
		popupText: '',
		inputValue: '',
		edit: false
	}

	componentDidMount() {
		if (this.props.watchlist === null) {
			this.props.fetchWatchlist();
			this.props.fetchCommonDetails();
		}
	}
	
	onInputChange = (event, value) => {
		if(event && event.type === 'change') {
			this.setState({inputValue: value})
			if(!value)
				return this.props.clearStockSearchResults();
			return event.nativeEvent.inputType === 'insertText'? this.props.fetchStockList(value) : null;
		}
	}

	filterOptions = (options) => options;

	handleStockSelect = val => {
		if(val && val.code) {
			this.props.updateWatchList('add', val.code);
			this.setState({inputValue: ''})
		}
		if(val && val.stkexchg) {
			this.props.updateWatchList('add', val.stkexchg, true);
			this.setState({inputValue: ''})
		}
	}

	handleInstrumentDelete = obj => {
		if(obj && obj.code) {
			this.props.updateWatchList('remove', obj.code);
		}
		if(obj && obj.stkexchg) {
			this.props.updateWatchList('remove', obj.stkexchg);
		}
	}

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
		return this.props.watchlist.map(item => {
			if(item.priceObj) {
				const className = item[item.priceObj].change >= 0 ? 'green' : 'red';
				return <TableRow hover key={item.name} onClick={() => this.props.setQuickView(item)}>
					<TableCell>
						<Typography variant='subtitle2'>{item.name}</Typography>
						<Typography variant='caption' color='textSecondary'>{item.priceObj.toUpperCase() + ': ' + format(Date.parse(item.lastupd), 'MMM dd, HH:mm')}</Typography>
						{/* <ShowChartRoundedIcon className='chart-icon'/> */}
					</TableCell>
					<TableCell align='right'>
						<Typography variant='subtitle2'>{item[item.priceObj].price.toFixed(2)}</Typography>
						<Typography variant='caption' color='textSecondary'>{'Vol: ' + getShortNumber(item[item.priceObj].VOL)}</Typography>
					</TableCell>
					<TableCell align='right' className={className}>
						<Typography variant='subtitle2'>{item[item.priceObj].change > 0 ? '+' + item[item.priceObj].change.toFixed(2) : item[item.priceObj].change.toFixed(2)}</Typography>
						<Typography variant='caption'>{item[item.priceObj].change > 0 ? '+' + item[item.priceObj].pricepercentchange.toFixed(2) + '%' : item[item.priceObj].pricepercentchange.toFixed(2) + '%'}</Typography>
					</TableCell>
				</TableRow>
			}
			const className = item.change >= 0 ? 'green' : 'red';
			return <TableRow hover key={item.stkexchg}>
				<TableCell>
					<Typography variant='subtitle2'>{item.stkexchg}</Typography>
					<Typography variant='caption' color='textSecondary'>{item.exchange + ': ' + format(Date.parse(item.lastupdated), 'MMM dd, HH:mm')}</Typography>
				</TableCell>
				<TableCell align='right'>
					<Typography variant='subtitle2'>{item.lastprice.toFixed(2)}</Typography>
					<Typography variant='caption' color='textSecondary'>Vol: 0</Typography>
				</TableCell>
				<TableCell align='right' className={className}>
					<Typography variant='subtitle2'>{item.change > 0 ? '+' + item.change.toFixed(2) : item.change.toFixed(2)}</Typography>
					<Typography variant='caption'>{item.change > 0 ? '+' + item.percentchange + '%' : item.percentchange + '%'}</Typography>
				</TableCell>
			</TableRow>
		});
	}

	renderEditList = () => {
		return this.props.watchlist.map(item => {
			if(item.stkexchg) {
				return <TableRow key={item.stkexchg}>
					<TableCell>
						<Typography variant='subtitle2'>{item.stkexchg}</Typography>
						<Typography variant='caption' color='textSecondary'>{item.exchange + ': ' + format(Date.parse(item.lastupdated), 'MMM dd, HH:mm')}</Typography>
					</TableCell>
					<TableCell align='right'>
						<Button onClick={e => this.handleInstrumentDelete(item)}>
							<DeleteOutlineRoundedIcon/>
						</Button>
					</TableCell>
				</TableRow>
			}
			return <TableRow key={item.name}>
				<TableCell>
					<Typography variant='subtitle2'>{item.name}</Typography>
					<Typography variant='caption' color='textSecondary'>{item.priceObj.toUpperCase() + ': ' + format(Date.parse(item.lastupd), 'MMM dd, HH:mm')}</Typography>
				</TableCell>
				<TableCell align='right'>
					<Button onClick={e => this.handleInstrumentDelete(item)}>
						<DeleteOutlineRoundedIcon/>
					</Button>
				</TableCell>
			</TableRow>
		});
	}

	render() {
		if(!this.props.SENSEX || this.props.watchlist === null)
			return <CircularProgress style={{margin: 'auto'}}/>

		const { popOver, popupText, inputValue, edit } = this.state;

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

				<div className='row title-row'>
					{!edit && <Typography style={{padding: 14}}>Watchlist</Typography>}
					{!edit && <span>
							<Button onClick={e => this.setState({edit: 'add'})}>
								<AddRoundedIcon/>
							</Button>
							<Button onClick={e => this.setState({edit: 'delete'})}>
								<EditIcon/>
							</Button>
						</span>
					}
					{edit === 'add' && 
						<Autocomplete
							style={{width: 319}}
							inputValue={inputValue}
							options={this.props.searchResults}
							getOptionLabel={option => option.full_name}
							autoHighlight={false}
							blurOnSelect
							loading={this.props.searchResults.length > 0 && !inputValue ? false : true}
							open={Boolean(inputValue) && this.props.searchResults.length > 0}
							onInputChange={this.onInputChange}
							onChange={(e, val) => this.handleStockSelect(val)}
							onBlur={this.props.clearStockSearchResults}
							filterOptions={this.filterOptions}
							clearOnEscape={true}
							renderOption={option => (
								<React.Fragment>
									<div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
										<span>{option.full_name}</span>
										<span style={{justifyContent: 'center'}}>
											<span>{option.index ? option.index : option.priceObj.toUpperCase()}</span>
										</span>
									</div>
								</React.Fragment>
							)}
							renderInput={params => (
								<TextField
									{...params}
									placeholder='Search eg. reliance, nifty'
									className='SearchInput'
									inputProps={{
										...params.inputProps,
										autoComplete: 'new-password', // disable autocomplete and autofill
									}}
									InputProps={{
										...params.InputProps,
										disableUnderline: true,
										startAdornment: <SearchRoundedIcon className='searchIcon'/>,
										endAdornment: null
									}}
								/>
							)}
						/>
					}
					{edit === 'delete' && <Typography style={{padding: 14}}>Edit Watchlist</Typography>}
					{edit && <Button variant='contained' onClick={e => this.setState({edit: false})}>Done</Button>}
				</div>
				<TableContainer className='table-container'>
					<Table>
						<TableBody>
							{edit === 'delete' ? this.renderEditList() : this.renderWatchList()}
						</TableBody>
					</Table>
				</TableContainer>
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
	fetchCommonDetails: PropTypes.func,
	SENSEX: PropTypes.object,
	'NIFTY 50': PropTypes.object
};

export default LeftDrawer;