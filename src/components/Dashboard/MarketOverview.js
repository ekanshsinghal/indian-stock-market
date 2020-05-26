import React from 'react';
import { ResponsiveLine } from '@nivo/line'

const MarketOverview = (props) => {
	const data = [{
		id: props.id,
		data: props.data
	}];
	return <ResponsiveLine
		data={data}
		width = {props.width}
		margin={{ top: 10, right: 30, bottom: 20}}
		enablePoints={false}
		enableGridX={false}
		// gridYValues={[10500, 11000, 11500, 12000]}
		axisBottom={{
			orient: 'bottom',
			tickSize: 5,
			format: '%Y %m %d',
            tickValues: 'every 1 months',
		}}
		useMesh={true}
		animate={true}
		crosshairType='cross'
		xScale={{
			type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
		}}
		xFormat="time:%Y-%m-%d"
		yScale={{type: 'linear', min: 'auto', max: 'auto'}}
		colors='#4184f3'
		// curve='catmullRom'
		legends={[
			{
				anchor: 'top-left',
				direction: 'column',
				translateY: -15,
				itemWidth: 100,
				itemHeight: 20,
			}
		]}
		tooltip={({point}) => {return(
			<div style={{backgroundColor: '#fff', padding: '9px', border: '1px solid #ccc'}}>
				{ point.data.x.toLocaleDateString('en-IN', {day: '2-digit', month: 'short', year: 'numeric'})}: <b>{point.data.y}</b>
			</div>
		)}}
	/>
}

export default MarketOverview;