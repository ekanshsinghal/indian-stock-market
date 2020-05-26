export const getPresentDate = () => {
	const dateObj = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	const weekday = ["Monday", "Tuseday", "Wednesday", "Thursaday", "Friday", "Saturday", "Sunday"];
	return weekday[dateObj.getDay()] + ', ' + dateObj.getDate() + ' ' + monthNames[dateObj.getMonth()] + ' ' + dateObj.getFullYear()
}

export const getShortNumber = num => {
	if(Math.abs(num/10000000) > 1) {
		return (num/10000000).toFixed(2) + 'Cr ';
	} else if(Math.abs(num/100000) > 1) {
		return (num/100000).toFixed(2) + 'L ';
	} else if(Math.abs(num/1000) > 1) {
		return (num/1000).toFixed(2) + 'K ';
	}
}

export const getLocaleNumber = value => {
	return value ? value.toLocaleString('en-IN', {'minimumFractionDigits': 2, 'maximumFractionDigits': 2}) : '-';
}