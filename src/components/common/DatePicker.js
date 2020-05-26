import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

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

const DatePickers = props => {
	const classes = useStylesReddit();
	const handleDateChange = (date) => {
		console.log('handleDateChange', date)
		props.setSelectedDate(date);
	};
	
	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<KeyboardDatePicker
				// disableToolbar
				disableFuture
				label='Date'
				variant="inline"
				inputVariant='filled'
				format="dd-MM-yyyy"
				value={props.value}
				onChange={handleDateChange}
				InputProps={{ classes, disableUnderline: true }}
				InputLabelProps={{
					style: {color: '#aaa'}
				}}
				autoOk={true}
			/>
		</MuiPickersUtilsProvider>
	)
}

export default DatePickers;