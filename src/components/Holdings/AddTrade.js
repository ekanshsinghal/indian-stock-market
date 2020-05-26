import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomTextField from '../common/CustomTextField/CustomTextField';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import './Holdings.scss';
import DatePickers from '../common/DatePicker';

const useStylesReddit = makeStyles({
	root: {
		borderRadius: 4,
		backgroundColor: '#eee !important',
		border: '1px solid #eee',
		padding: '10px 65px 10px 12px !important',
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

const AddTrade = props => {
	const classes = useStylesReddit();
	const { open, handleClose, searchResults, clearStockSearchResults } = props;
	const [inputVal, setInputVal] = React.useState('');
	const [code, setCode] = React.useState('');
	const [trade, setTrade] = React.useState('');
	const [qty, setQty] = React.useState('');
	const [price, setPrice] = React.useState('');
	const [date, setDate] = React.useState();

	const onInputChange = (event, value) => {
		if(event && event.type === 'change') {
			setInputVal(value);
			if(code) setCode('');
			return value ? props.fetchStockList(value) : clearStockSearchResults();
		}
		if(event && event.type === 'click') {
			setInputVal(value);
		}
		if(event && event.keyCode === 13) {
			for(let i = 0; i < searchResults.length; i++) {
				if(value === searchResults[i].full_name) {
					setInputVal(value);
					setCode(searchResults[i].code);
					break
				}
			}
		}
	}
	
	const onKeyDown = e => {
		if(e.keyCode === 9 && !code) setInputVal('');
	}

	const onClose = () => {
		setInputVal('');
		setCode('');
		setTrade('');
		setQty('');
		setPrice('');
		setDate(null);
		return handleClose();
	}

	const onClickAddTrade = () => {
		if(!code) return props.showAlert({type: 'error', error: 'No script choosen.'});
		if(!trade) return props.showAlert({type: 'error', error: 'Choose Trade.'});
		if(!qty) return props.showAlert({type: 'error', error: 'Add Quantity'});
		if(!price) return props.showAlert({type: 'error', error: 'Enter Price'});
		if(!date) return props.showAlert({type: 'error', error: 'Enter Date'});
		if(code && trade && qty && price) {
			props.addToPortfolio({code, trade, qty, price, date});
			onClose();
		}
	}

	return <Dialog open={open} onClose={onClose}>
		<DialogTitle>Add Trade</DialogTitle>
		<DialogContent>
			<Autocomplete
				style={{marginBottom: 22, width: 552}}
				inputValue={inputVal}
				options={searchResults}
				getOptionLabel={option => option.full_name}
				autoHighlight={false}
				loading={searchResults.length > 0 ? false : true}
				loadingText={'Enter a script...'}
				onInputChange={onInputChange}
				onChange={(e, val) => val && val.code ? setCode(val.code) : null}
				onBlur={clearStockSearchResults}
				filterOptions={options => options}
				getOptionSelected={options => options}
				onKeyDown={onKeyDown}
				clearOnEscape={true}
				renderOption={option => (
					<React.Fragment>
						<div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
							<span>{option.full_name}</span>
							<span style={{justifyContent: 'center'}}>
								<span>{option.index ? option.index : option.priceObj.toUpperCase()}</span>
							</span>
						</div>
					</React.Fragment>
				)}
				renderInput={params => (
					<TextField
						{...params}
						placeholder='Search eg. reliance, tcs'
						className='SearchInput'
						variant='filled'
						inputProps={{
							...params.inputProps,
							autoComplete: 'new-password', // disable autocomplete and autofill
						}}
						InputProps={{
							...params.InputProps,
							classes,
							disableUnderline: true,
							startAdornment: <SearchRoundedIcon className='searchIcon'/>
						}}
					/>
				)}
			/>
			<div className='row'>
				<CustomTextField
					label='Trade'
					variant="filled"
					value={trade}
					onChange={e => setTrade(e.target.value)}
					style={{marginBottom: 22, marginRight: 22, width: 265}}
					select
				>
					<MenuItem value='b'>Buy</MenuItem>
					<MenuItem value='s'>Sell</MenuItem>
				</CustomTextField>
				<DatePickers value={date} setSelectedDate={setDate}/>
			</div>
			<div className='row'>
				<CustomTextField
					label='Qty'
					variant="filled"
					value={qty}
					onChange={e => setQty(e.target.value)}
					style={{marginBottom: 22, marginRight: 22, width: 255}}
				/>
				<CustomTextField
					label='Price'
					variant="filled"
					value={price}
					onChange={e => setPrice(e.target.value)}
					style={{marginBottom: 22, flex: 1}}
				/>
			</div>
		</DialogContent>
		<DialogActions>
			<Button onClick={onClickAddTrade} variant='contained' style={{backgroundColor: '#ff5722', color: '#fff', width: 100}}>
				<Typography variant='overline'>Add</Typography>
			</Button>
			<Button onClick={onClose} variant='contained' style={{width: 100}}>
				<Typography variant='overline'>Cancel</Typography>
			</Button>
		</DialogActions>
	</Dialog>;
};

export default AddTrade;