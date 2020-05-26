import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Toolbar, Button, SvgIcon, Menu, MenuItem, ListItemText, Select } from '@material-ui/core';

import ChartLayout from './ChartLayout';
import { ReactComponent as ChevronDown } from '../../assets/icons/chevron-down-outline.svg'
import { lineOptions } from './chartOptions';
import './AdvanceCharts.scss'

class AdvanceCharts extends React.Component {

	state={
		menuOpen: null,
		multichart: 1,
		stock: 'ri',
		chartOptions: lineOptions
	};

	componentDidMount() {
		this.props.requestHistory('ri');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if(nextProps.adv_chart_data && ( !prevState.chartOptions.series || nextProps.adv_chart_data.name !== prevState.chartOptions.series[0].name)) {
			let line = [], volume = [], datalength = nextProps.adv_chart_data.hist.length;
			for (let i=0; i< datalength; i++) {
				line.push([
					nextProps.adv_chart_data.hist[i][0],
					nextProps.adv_chart_data.hist[i][4],
				]);
				volume.push([
					nextProps.adv_chart_data.hist[i][0],
					nextProps.adv_chart_data.hist[i][5],
				]);
			}
			let chartOptions = prevState.chartOptions;
			chartOptions.series[0].name = nextProps.adv_chart_data.name;
			chartOptions.series[0].data = line;
			chartOptions.series[1].data = volume;
			return {chartOptions}
		}
		return null;
	}

	handleMenu = e => {
		this.setState({menuOpen: e.currentTarget});
	}
	handleMenuClose = () => {
		this.setState({menuOpen: null});
	}
	setMultiChart = multichart => {
		this.setState({multichart, menuOpen: null});
	}

	handleChartChange = e => {
		this.props.requestHistory(e.target.value);
		this.setState({stock: e.target.value});
	};

	renderInputs = () => {
		return <Select
			native
			value={this.state.stock}
			onChange={this.handleChartChange}
			>
				<option value='ri'>Reliance</option>
				<option value='tcs'>TCS</option>
				<option value='dcb'>Dalmia Sugar</option>
				<option value='bac01'>Bengal and Assam</option>
			</Select>
	};

	render() {
		if (this.state.chartOptions.series && !this.state.chartOptions.series[0].name) return <CircularProgress style={{flex: 1, margin: 'auto'}}/>

		return <div className='AdvanceCharts'>
			<Toolbar variant='dense'>
				<div className='column'>
					{this.renderInputs()}
				</div>
				<Button onClick={this.handleMenu} startIcon={<SvgIcon component={ChevronDown} viewBox="0 0 512 512" htmlColor='#f00'/>}>
					Display
				</Button>
				<Button onClick={this.handleMenu} startIcon={<SvgIcon component={ChevronDown} viewBox="0 0 512 512" htmlColor='#f00'/>}>
					Layout
				</Button>
				<Menu
					anchorEl={this.state.menuOpen}
					anchorOrigin={{ vertical: "bottom", horizontal: "right"}}
					transformOrigin={{ vertical: "top", horizontal: "right" }}
					getContentAnchorEl={null}
					onClose={this.handleMenuClose}
					open={Boolean(this.state.menuOpen)}
					classes={{
						paper: 'paper',
						list: 'list'
					}}
				>
					<MenuItem onClick={() => this.setMultiChart(1)}>
						<ListItemText primary='1 chart'/>
					</MenuItem>
					<MenuItem onClick={() => this.setMultiChart(2)}>
						<ListItemText primary='2 charts'/>
					</MenuItem>
					<MenuItem onClick={() => this.setMultiChart(4)}>
						<ListItemText primary='4 charts'/>
					</MenuItem>
				</Menu>
			</Toolbar>
			<ChartLayout multichart={this.state.multichart} chartOptions={this.state.chartOptions}/>
		</div>
	}
}

AdvanceCharts.propTypes = {
	requestHistory: PropTypes.func,
	adv_chart_data: PropTypes.object
}

export default AdvanceCharts;