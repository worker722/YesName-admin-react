/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container, Box } from '@material-ui/core';

// Components
import { withTheme } from '@material-ui/core/styles';

// Data
const styles = theme => ({
	Paper: {
		padding: '0.75rem',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		'&:first-child': {
			paddingTop: '24px',
		},
		'&:last-child': {
			paddingBottom: '30px',
		}
	},
	pad0: {
		padding: 0
	}
});

class Dashboard2 extends Component {
	render() {
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<div>
							Dashboard 2
						</div>						
					</Box>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(withTheme(Dashboard2));