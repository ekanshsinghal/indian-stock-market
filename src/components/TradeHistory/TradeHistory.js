import React from 'react';
import { TableContainer, Table, TableBody, TableRow, TableCell, CircularProgress, Typography, Button, TableHead } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { format } from 'date-fns';

import TableHeadCell from '../common/TableHeadCell';
import './TradeHistory.scss'
import { stableSort, getComparator } from '../../utilities/tableHelper';

const headCells = [
	{ className: null,	label: 'Script',	id: 'full_name'},
	{ className: null,	label: 'Date',		id: 'date'}
]

class TradeHistory extends React.Component {
	state = {
		order: 'desc',
		orderBy: 'date',
	}

	componentDidMount() {
		this.props.fetchTradeHistory();
	}

	handleRequestSort = (e, property) => {
		const isAsc = this.state.orderBy === property && this.state.order === 'asc';
		this.setState({order: isAsc ? 'desc' : 'asc', orderBy: property});
	}

	getNumber = value => value.toLocaleString('en-IN', {'minimumFractionDigits': 2, 'maximumFractionDigits': 2});

	render() {
		if(this.props.trades.componentState !== 'AVAILABLE') {
			return <div style={{textAlign: 'center'}}>
				<CircularProgress/>
			</div>
		}

		const { order, orderBy } = this.state;
		return (
			<div className='TradeHistory'>
				<div className='row'>
					<Typography variant='h5' className='column'>Trade History</Typography>
					<Button variant='contained' size='small' className='Button' onClick={this.toggleDialog}>
						<AddRoundedIcon/>
						Add Trade
					</Button>
				</div>
				<TableContainer className='table-container'>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableHeadCell headCell={headCells[0]} order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort}/>
								<TableHeadCell align='right' headCell={headCells[1]} order={order} orderBy={orderBy} onRequestSort={this.handleRequestSort}/>
								<TableCell align='right'>Buy Qty</TableCell>
								<TableCell align='right'>Sell Qty</TableCell>
								<TableCell align='right'>Price</TableCell>
								<TableCell align='right'>Cost</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{stableSort(this.props.trades.trades, getComparator(order, orderBy)).map((item, i) => <TableRow key={i} hover>
								<TableCell>{item.full_name}</TableCell>
								<TableCell align='right'>{format(Date.parse(item.date), 'dd-MMM-yyyy')}</TableCell>
								{item.trade === 'b' ? <TableCell align='right'>{item.qty}</TableCell> : <TableCell/>}
								{item.trade === 's' ? <TableCell align='right'>{item.qty}</TableCell> : <TableCell/>}
								<TableCell align='right'>{item.price}</TableCell>
								<TableCell align='right'>{item.trade === 'b' ? this.getNumber(item.price * item.qty) : this.getNumber(-1 * item.price * item.qty)}</TableCell>
							</TableRow>)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		)
	}
}

export default TradeHistory;