import React from 'react';
import { Popper } from '@material-ui/core';
import './Popover.scss'

const Popover = props => {

	return(
		<Popper
			open={props.open}
			anchorEl={props.rootRef}
			placement={props.placement}
			className='Popover'
			modifiers={{
				arrow: {
					enabled: true,
					// element: arrowRef
				}
			}}
			transition
		>
			{props.children}
		</Popper>
	)
}

export default Popover;