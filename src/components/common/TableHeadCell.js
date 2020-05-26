import React from 'react';
import { TableCell, TableSortLabel } from '@material-ui/core';

export default function TableHeadCell(props) {
	const { order, orderBy, onRequestSort, headCell } = props;

	const createSortHandler = property => event => {
		onRequestSort(event, property);
	};

	return (
		<TableCell
			align={props.align}
			sortDirection={orderBy === headCell.id ? order : false}
			className={headCell.className}
		>
			<TableSortLabel
				active={orderBy === headCell.id}
				direction={orderBy === headCell.id ? order : 'asc'}
				onClick={createSortHandler(headCell.id)}
			>
				{headCell.label}
			</TableSortLabel>
		</TableCell>
	)
}