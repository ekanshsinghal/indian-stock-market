import React from 'react';
import PropTypes from 'prop-types';
import { TextField, MenuItem } from '@material-ui/core';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { getChartOptions } from './chartOptions';
import './Charts.scss'
import CustomTextField from '../common/CustomTextField/CustomTextField';

class Charts extends React.Component {

	state={
		chartOptions: null,
		quickView: this.props.quickView,
		chartType: 'line'
	};

	componentDidUpdate(prevProps) {
		if(this.props.adv_chart_data && ( !prevProps.adv_chart_data || this.props.adv_chart_data.name !== prevProps.adv_chart_data.name)) {
			this.setState(getChartOptions(this.state.chartType, this.props.adv_chart_data, this.props.quickView));
		}
		if(this.state.chartOptions && this.state.chartOptions.series[0].type !== this.state.chartType) {
			this.setState({chartOptions: null}, () => {
				this.setState(getChartOptions(this.state.chartType, this.props.adv_chart_data, this.props.quickView));
			})
		}
		if(this.state.quickView !== this.props.quickView && this.state.chartOptions !== null) {
			let chartOptions = this.state.chartOptions;
			chartOptions.chart.width = this.props.quickView ? (window.innerWidth - 854) : (window.innerWidth - 504);
			this.setState({chartOptions, quickView: this.props.quickView});
		}
	}

	onChartTypeChange = e => this.setState({chartType: e.target.value});

	handleChartChange = val => {
		if(!val) return;
		return val.code ? this.props.requestHistory(val.code) : this.props.requestHistory(val.stkexchg);
	};
	
	onInputChange = (event, value) => {
		if(value && event && event.nativeEvent.inputType === 'insertText')
			this.props.fetchStockList(value);
	}

	filterOptions = (options) => options;

	render() {
		const { chartOptions } = this.state;

		return <div className='Charts'>
			<div className='row'>
				<Autocomplete
					style={{width: 300}}
					options={this.props.searchResults}
					getOptionLabel={option => option.full_name}
					autoHighlight={false}
					blurOnSelect
					loading={this.props.searchResults.length > 0 ? false : true}
					loadingText={'Enter a script...'}
					onInputChange={this.onInputChange}
					onChange={(e, val) => this.handleChartChange(val)}
					onBlur={this.props.clearStockSearchResults}
					filterOptions={this.filterOptions}
					renderOption={option => (
						<React.Fragment>
							<div style={{width: 300, display: 'flex', justifyContent: 'space-between'}}>
								<span>{option.full_name}</span>
								<span>{option.index ? option.index : option.priceObj.toUpperCase()}</span>
							</div>
						</React.Fragment>
					)}
					renderInput={params => (
						<TextField
							{...params}
							label='Choose Instrument'
							variant='outlined'
							inputProps={{
								...params.inputProps,
								autoComplete: 'new-password', // disable autocomplete and autofill
							}}
						/>
					)}
				/>
				<CustomTextField
					label='Chart'
					variant="filled"
					style={{width: 200, marginLeft: 16}}
					value={this.state.chartType}
					onChange={this.onChartTypeChange}
					select
					SelectProps={{
						MenuProps: {
						anchorOrigin: {vertical: 'bottom', horizontal: 'center'},
						transformOrigin: { vertical: "top", horizontal: "center" },
						getContentAnchorEl: null}
					}}
				>
					<MenuItem value='line'>Line Chart</MenuItem>
					<MenuItem value='area'>Area Chart</MenuItem>
					<MenuItem value='candlestick'>CandleStick</MenuItem>
					<MenuItem value='ohlc'>OHLC Chart</MenuItem>
					<MenuItem value='lineStick'>Line - CandleStick</MenuItem>
				</CustomTextField>
			</div>
			{ chartOptions ? <HighchartsReact
				highcharts={Highcharts}
				options={chartOptions}
				constructorType={'stockChart'}
				containerProps={{className:'column'}}
				/> : <div style={{height: window.innerHeight - 172, textAlign: 'center', paddingTop: '20%'}}>No data To Display</div>
			}
		</div>
	}
}

Charts.propTypes = {
	requestHistory: PropTypes.func,
	fetchStockList: PropTypes.func,
	adv_chart_data: PropTypes.object
}

export default Charts;