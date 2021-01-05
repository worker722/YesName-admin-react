/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Paper, Container, Box } from '@material-ui/core';
import DynamicDataChart from 'components/Widgets/DynamicDataChart';
import { withTheme } from '@material-ui/core/styles';
import { getUsers } from 'actions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

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

class Dashboard extends Component {

	componentDidMount() {
		this.props.getUsers();
	}
	getStats() {
		let { users: { users } } = this.props;
		if (!users) {
			users = [];
		}
		return [
			{
				icon: 'supervised_user_circle',
				iconColor: 'text-danger',
				title: 'widgets.totalUsers',
				count: users.length
			},
			{
				icon: 'supervised_user_circle',
				iconColor: 'text-primary',
				title: 'Allowed users',
				count: users.filter(item => item.state === 1).length
			},
			{
				icon: 'shopping_cart',
				iconColor: 'text-success',
				title: 'Blocked users',
				count: users.filter(item => item.state === 2).length
			}
		];
	}
	render() {
		const { classes } = this.props;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<Paper className={classes.Paper} square >
							<DynamicDataChart stats={this.getStats()} />
						</Paper>
					</Box>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = ({ users }) => {
	return { users }
}
export default withRouter(connect(mapStateToProps, { getUsers })(withStyles(styles)(withTheme(Dashboard))));