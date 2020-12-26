/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container,Paper} from '@material-ui/core';


const styles = theme => ({
	overview: {
		padding: 12,
		backgroundColor: theme.palette.primary.main,
		marginBottom: 12,
	},
	Paper: {
		padding: '0.75rem',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		'&:last-child': {
			paddingBottom: '30px',
		}
	}
});

class Dashboard3 extends Component {

	render() {
		const { classes } = this.props;
		return (
			<div className="ecommerce-dashboard">
				<Container maxWidth="lg">
					<Paper className={classes.Paper} square>	
						<div>
							Dashboard 3
						</div>			
					</Paper>	
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(Dashboard3);