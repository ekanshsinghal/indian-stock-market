import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';

// const root= {
// 	name: "loss",
// 	children: [
// 	{
// 		name: "viz",
// 		loc: 154747
// 	}, {
// 		name: "aaa",
// 		loc: 154766
// 	}
// ]
// }
const MyTreeMap = props => (
	<ResponsiveTreeMap
		root={props.root}
		identity="name"
		value='loc'
		// tile='resquarify'
		labelSkipSize={30}
		colors={{ scheme: 'nivo' }}
		colorBy="name"
		animate={true}
	/>
)

export default MyTreeMap;