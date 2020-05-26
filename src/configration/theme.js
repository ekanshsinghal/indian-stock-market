import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
	typography: {
		fontFamily: 'Open Sans'
	},
	overrides: {
		MuiButton: {
			root: {
				// fontWeight: 400,
				margin: 8,
				fontSize: 13,
				// textTransform: 'none'
			}
		},
		MuiIconButton: {
			root: {
				color: '#000'
			}
		},
		MuiCardContent: {
			root: {
				padding: 24
			}
		},
		MuiAppBar: {
			colorPrimary: {
				color: '#464646',
				backgroundColor: '#fff'
			},
			positionFixed: {
				boxShadow: '0 0 5px 0 rgba(0,0,0,0.1)'
			}
		},
		MuiTableCell: {
			body: {
				color: 'inherit'
			}
		}
	}
})

export const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	typography: {
		fontFamily: 'Open Sans'
	},
	overrides: {
		MuiAppBar: {
			colorPrimary: {
				backgroundColor: '#000',
			}
		},
		MuiButton: {
			root: {
				// fontWeight: 400,
				margin: 8,
				fontSize: 13,
				// textTransform: 'none',
				color: '#666'
			}
		},
		MuiCardContent: {
			root: {
				padding: 24
			}
		},
		MuiTableCell: {
			body: {
				color: 'inherit'
			}
		}
	}
})