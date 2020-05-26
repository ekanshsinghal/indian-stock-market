export const lineOptions = {
	credits: {
		enabled: false
	},
	rangeSelector: {
		selected: 1,
		buttons: [{
			type: 'month',
			count: 1,
			text: '1M'
		}, {
			type: 'month',
			count: 3,
			text: '3M'
		}, {
			type: 'month',
			count: 6,
			text: '6M'
		}, {
			type: 'year',
			count: 1,
			text: '1Y'
		}, {
			type: 'year',
			count: 2,
			text: '2Y'
		}, {
			type: 'year',
			count: 5,
			text: '5Y'
		}, {
			type: 'all',
			count: 1,
			text: 'All'
		}]
	},
	chart: {},
	yAxis: [{
		labels: {
			align: 'right',
			x: -3
		},
		title: {text: 'Price'},
		height: '75%',
		lineWidth: 2,
		resize: {enabled: true}
	}, {
		labels: {
			align: 'right',
			x: -3
		},
		title: {text: 'Volume'},
		top: '77%',
		height: '23%',
		offset: 0,
		lineWidth: 2
	}],
	tooltip: {
		crosshairs: [true, true],
		split: true
	},
	title: {
		floating: true,
		style: {
			fontFamily: 'Open Sans',
			fontSize: '24px'
		},
	},
	series: []
};

const seriesSecondary = {
	type: 'column',
	name: 'Volume',
	yAxis: 1
};

const gradiantFill = {
	linearGradient: {
		x1: 0,
		y1: 0,
		x2: 0,
		y2: 1
	},
	stops: [
		[0, '#7cb5ec'],
		[1, '#fff']
	]
}

const groupingUnits = [
	[
		'day', [1]
	], [
		'week', [1]
	], [
		'month', [1, 2, 3, 4, 6]
	]
];

const getClosingPrices = arr => {
	let line = [], volumes = [];
	arr.forEach(element => {
		line.push([element[0], element[4]]);
		volumes.push([element[0], element[5]]);
	});
	return [line, volumes];
};

const getOHLCPrices = arr => {
	let line = [], volumes = [];
	arr.forEach(element => {
		line.push([element[0], element[1], element[2], element[3], element[4]]);
		volumes.push([element[0], element[5]]);
	});
	return [line, volumes];
};

export const getChartOptions = (chartType, chartData, quickView) => {
	let chartOptions = JSON.parse(JSON.stringify(lineOptions));
	let line, volume;
	switch (chartType) {
		case 'line':
			[line, volume] = getClosingPrices(chartData.hist);
			chartOptions.series[0] = {
				type: 'line',
				name: chartData.name,
				data: line,
				dataGrouping: {enabled: false},
				tooltip: {valueDecimals: 2}
			};
			chartOptions.series[1] = seriesSecondary;
			chartOptions.series[1].data = volume;

			chartOptions.title.text = chartData.name;
			chartOptions.chart = {
				height: window.innerHeight - 172,
				width: quickView ? (window.innerWidth - 854) : (window.innerWidth - 504)
			}
			return {chartOptions};
		case 'area':
			[line, volume] = getClosingPrices(chartData.hist);
			chartOptions.series[0] = {
				type: 'area',
				name: chartData.name,
				data: line,
				dataGrouping: {enabled: false},
				fillColor: gradiantFill,
				threshold: null,
				tooltip: {valueDecimals: 2}
			};
			chartOptions.series[1] = seriesSecondary;
			chartOptions.series[1].data = volume;

			chartOptions.title.text = chartData.name;
			chartOptions.chart = {
				height: window.innerHeight - 172,
				width: quickView ? (window.innerWidth - 854) : (window.innerWidth - 504)
			}
			return {chartOptions};
		case 'candlestick':
			[line, volume] = getOHLCPrices(chartData.hist);
			
			chartOptions.series[0] = {
				type: 'candlestick',
				name: chartData.name,
				data: line,
				dataGrouping: {
					units: groupingUnits,
					groupPixelWidth: 25
				},
				tooltip: {valueDecimals: 2}
			};
			chartOptions.series[1] = seriesSecondary;
			chartOptions.series[1].data = volume;
			
			chartOptions.title.text = chartData.name;
			chartOptions.chart = {
				height: window.innerHeight - 172,
				width: quickView ? (window.innerWidth - 854) : (window.innerWidth - 504)
			}
			return {chartOptions};
		case 'ohlc':
			[line, volume] = getOHLCPrices(chartData.hist);
			
			chartOptions.series[0] = {
				type: 'ohlc',
				name: chartData.name,
				data: line,
				dataGrouping: {
					units: groupingUnits,
					groupPixelWidth: 20
				},
				tooltip: {valueDecimals: 2}
			};
			chartOptions.series[1] = seriesSecondary;
			chartOptions.series[1].data = volume;
			
			chartOptions.title.text = chartData.name;
			chartOptions.chart = {
				height: window.innerHeight - 172,
				width: quickView ? (window.innerWidth - 854) : (window.innerWidth - 504)
			}
			return {chartOptions};
		case 'lineStick':
			[line, volume] = getClosingPrices(chartData.hist);
			chartOptions.series[0] = {
				type: 'line',
				name: chartData.name,
				data: line,
				tooltip: {valueDecimals: 2}
			};

			let [candlestick] = getOHLCPrices(chartData.hist);
			chartOptions.series[1] = {
				type: 'candlestick',
				name: chartData.name,
				data: candlestick,
				dataGrouping: {
					units: groupingUnits,
					groupPixelWidth: 20
				},
				tooltip: {valueDecimals: 2}
			};

			chartOptions.series[2] = seriesSecondary;
			chartOptions.series[2].data = volume;

			chartOptions.title.text = chartData.name;
			chartOptions.chart = {
				height: window.innerHeight - 172,
				width: quickView ? (window.innerWidth - 854) : (window.innerWidth - 504)
			}
			return {chartOptions};
		default: return {chartOptions: null};
	};
};