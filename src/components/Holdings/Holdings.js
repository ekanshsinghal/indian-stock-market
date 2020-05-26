import React from 'react';
import PropTypes from 'prop-types';
import { TableContainer, Table, TableBody, TableRow, TableCell, Typography, Button, TableHead } from '@material-ui/core';
// import ShowChartRoundedIcon from '@material-ui/icons/ShowChartRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

import { stableSort, getComparator } from '../../utilities/tableHelper';
import TableHeadCell from '../common/TableHeadCell';
import './Holdings.scss';
import AddTrade from './AddTrade';
import { STATUS } from '../../actions/action_constants';

const headCells = [
	{ className: 'columnDivider',	label: 'Instrument', id: 'name', },
	{ className: null,				label: 'Qty.', id: 'netPos', },
	{ className: null,				label: 'Avg. cost', id: 'avg_price', },
	{ className: 'columnDivider',	label: 'LTP', id: 'LTP', },
	{ className: null,				label: 'Current Value', id: 'currVal', },
	{ className: 'PofitLoss',		label: 'P&L', id: 'unrealised_pl', },
	{ className: null,				label: 'Net chg.', id: 'net_change', },
	{ className: null,				label: 'Day chg.', id: 'daily_change', },
];

class Holdings extends React.Component {

	state = {
		order: 'asc',
		orderBy: 'name',
		dialog: false
	};
	
	componentDidMount() {
		if(this.props.portfolio.componentState !== STATUS.AVAILABLE) {
			this.props.fetchPortfolio();
		}
	}

	toggleDialog = () => this.setState({dialog: !this.state.dialog});

	handleRequestSort = (event, property) => {
		const isAsc = this.state.orderBy === property && this.state.order === 'asc';
		this.setState({order: isAsc ? 'desc' : 'asc', orderBy: property})
	};
	
	getNumber = value => value.toLocaleString('en-IN', {'minimumFractionDigits': 2, 'maximumFractionDigits': 2});

	setQuickView = (e, item) => {
		if (e.target.tagName === 'svg') return null;
		this.props.setQuickView(item);
	}

	showHistoryChart = code => {
		this.props.requestHistory(code);
		this.props.history.push('/charts');
	}

	render() {
		const { order, orderBy } = this.state;

		return (
			<div className='Holdings'>
				<div className='row greeting'>
					<Typography variant='h5' className='column'>Holdings ({this.props.portfolio.scripts.length})</Typography>
					<Button variant='contained' size='small' className='Button' onClick={this.toggleDialog}>
						<AddRoundedIcon/>
						Add Trade
					</Button>
				</div>
				<TableContainer className='table-container'>
					<Table stickyHeader >
						<TableHead>
							<TableRow>
								{headCells.map((headCell, i) => <TableHeadCell key={i} align={i>0 ? 'right': 'left'} headCell={headCell} order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort}/>)}
							</TableRow>
						</TableHead>
						<TableBody>
							{stableSort(this.props.portfolio.scripts, getComparator(order, orderBy))
								.map(row => {
									const className = row.unrealised_pl > 0 ? 'green': 'red';
									return (
										<TableRow hover key={row.name} className='holding-row' onClick={e => this.setQuickView(e, row)}>
											<TableCell component='th' scope='row' className='columnDivider'>
												{row.name}
												{/* <ShowChartRoundedIcon className='menu-icon' onClick={() => this.showHistoryChart(row.code)}/> */}
											</TableCell>
											<TableCell align='right'>{row.netPos}</TableCell>
											<TableCell align='right'>{row.avg_price}</TableCell>
											<TableCell align='right' className='columnDivider'>{row[row.priceObj].price}</TableCell>
											<TableCell align='right'>{this.getNumber(row.netPos * row[row.priceObj].price)}</TableCell>
											<TableCell align='right' className={`PofitLoss ${className}`}>{this.getNumber(row.unrealised_pl)}</TableCell>
											<TableCell align='right' className={className}>{this.getNumber(row.net_change) + '%'}</TableCell>
											<TableCell align='right' className={className}>{this.getNumber(row.daily_change) + '%'}</TableCell>
										</TableRow>
									)
								})
							}
						</TableBody>
					</Table>
				</TableContainer>
				<AddTrade
					open={this.state.dialog}
					handleClose={this.toggleDialog}
					{...this.props}
				/>
			</div>
		)
	}
}

Holdings.propTypes = {
	portfolio:	PropTypes.object,
};

export default Holdings;