export function descendingComparator (a, b, orderBy) {
	switch(orderBy) {
		case 'date':
		case 'name':
		case 'netPos':
		case 'avg_price':
		case 'unrealised_pl':
		case 'net_change':
		case 'daily_change': return b[orderBy] >= a[orderBy] ? 1 : -1
		case 'full_name':
			if (a.full_name === b.full_name)
				return b.date >= a.date ? 1 : -1;
			return b.full_name > a.full_name ? 1 : -1;
		case 'LTP': return b[b.priceObj].price >= a[a.priceObj].price ? 1: -1;
		case 'currVal': return b.netPos*b[b.priceObj].price >= a.netPos*a[a.priceObj].price ? 1: -1;
		default: return 0;
	}
}

export function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

export function getComparator (order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}