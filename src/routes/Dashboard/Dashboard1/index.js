import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import {Paper,  Container } from '@material-ui/core';
// Component
import { withTheme } from '@material-ui/core/styles';

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
	}
});

class Dashboard1 extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className="webanalyics-dashboard">
				<Container maxWidth="lg">
					<Paper className={classes.Paper} square>
						<div>
							Dashboard 1
						</div>
					</Paper>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(withTheme(Dashboard1));