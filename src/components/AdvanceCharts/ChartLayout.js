import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const ChartLayout = props => {
	let chartOptions = props.chartOptions;
	switch(props.multichart) {
		case 1:
			chartOptions.chart.height = window.innerHeight - 66;
			return <HighchartsReact highcharts={Highcharts} options={chartOptions} constructorType={'stockChart'} containerProps={{className:'column'}}/>;
		case 2:
			chartOptions.chart.height = (window.innerHeight - 66)/2;
			return (
				<div>
					<div className='row'>
						<HighchartsReact highcharts={Highcharts} options={props.chartOptions} constructorType={'stockChart'} updateArgs={[true, true, true]} containerProps={{className:'column'}}/>
					</div>
					<div className='row'>
						<HighchartsReact highcharts={Highcharts} options={props.chartOptions} constructorType={'stockChart'} updateArgs={[true, true, true]} containerProps={{className:'column'}}/>
					</div>
				</div>
			)
		case 4:
			chartOptions.chart.height = (window.innerHeight - 66)/2;
			return (
				<div>
					<div className='row'>
						<HighchartsReact highcharts={Highcharts} options={props.chartOptions} constructorType={'stockChart'} updateArgs={[true, true, true]} containerProps={{className:'multichart'}}/>
						<HighchartsReact highcharts={Highcharts} options={props.chartOptions} constructorType={'stockChart'} updateArgs={[true, true, true]} containerProps={{className:'multichart'}}/>
					</div>
					<div className='row'>
						<HighchartsReact highcharts={Highcharts} options={props.chartOptions} constructorType={'stockChart'} updateArgs={[true, true, true]} containerProps={{className:'multichart'}}/>
						<HighchartsReact highcharts={Highcharts} options={props.chartOptions} constructorType={'stockChart'} updateArgs={[true, true, true]} containerProps={{className:'multichart'}}/>
					</div>
				</div>
			)
		default: return;
	}
}

export default ChartLayout;