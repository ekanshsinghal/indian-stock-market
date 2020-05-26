import React from 'react';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton, Button } from '@material-ui/core';

const TablePagination = (props) => {
	const { count, rowsPerPage, page, onChangePage} = props;

	const onClickNext = () => onChangePage(page + 1);
	const onClickBack = () => onChangePage(page - 1);

	return (
		<div className='row'>
			<Button>
				<EditIcon/>
			</Button>
			<div className='column'/>
			<span>
				{(page * rowsPerPage + 1) + '-' + Math.min(page * rowsPerPage + rowsPerPage, count) + ' of ' + count}
				<span style={{marginLeft: 20}}>
					<IconButton disabled={page === 0} onClick={onClickBack}>
						<ChevronLeftRoundedIcon/>
					</IconButton>
					<IconButton disabled={page * rowsPerPage + rowsPerPage >= count} onClick={onClickNext}>
						<ChevronRightRoundedIcon/>
					</IconButton>
				</span>
			</span>
		</div>
	);
};

export default TablePagination;