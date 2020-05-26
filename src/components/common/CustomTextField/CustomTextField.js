import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

const useStylesReddit = makeStyles({
	root: {
		borderRadius: 4,
		backgroundColor: '#eee !important',
		border: '1px solid #eee',
		'&:hover': {
			backgroundColor: '#fff !important',
			border: '1px solid #e0e0e0',
		},
		'&$focused': {
			backgroundColor: '#fff !important',
			border: '1px solid #9b9b9b',
		},
	},
	focused: {},
});

const CustomTextField = (props) => {
	const classes = useStylesReddit();
	
	return (
		<TextField
			InputProps={{ classes, disableUnderline: true }}
			InputLabelProps={{
				style: { color: props.error ? '#f44336' : '#aaa' }
			}}
			ref={props.anchor}
			{...props}
		/>
	);
}

export default CustomTextField;