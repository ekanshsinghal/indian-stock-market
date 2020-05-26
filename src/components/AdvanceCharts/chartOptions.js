export const lineOptions = {
	rangeSelector: {
		selected: 3,
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
	chart: {
		// height: 'initial',
	},
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
	series: [{
		type: 'line',
		// name: 'Nifty 50',
		// data: line,
		tooltip: {valueDecimals: 2}
	}, {
		type: 'column',
		name: 'Volume',
		// data: volume,
		yAxis: 1
	}]
};