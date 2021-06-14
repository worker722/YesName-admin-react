/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Paper, Container, Box } from '@material-ui/core';
import DynamicDataChart from 'components/Widgets/DynamicDataChart';
import { withTheme } from '@material-ui/core/styles';
import { getUsers, getStorageDetail } from 'actions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { userService } from "../../_services";
import { NotificationManager } from 'react-notifications';

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
		this.refresh();
	}
	refresh() {
		this.props.getUsers();
		this.props.getStorageDetail();
	}
	getProgressData() {
		let { app: { storageInfo } } = this.props;
		const usedpace = (storageInfo.files * 100 / storageInfo.size).toFixed(2);
		const freespace = (storageInfo.free * 100 / storageInfo.size).toFixed(2);
		return [
			{
				id: 1,
				title: `Free space ${storageInfo?.str?.free || ''}`,
				progress: `${freespace}%`,
				value: freespace
			},
			{
				id: 1,
				title: `Storage size ${storageInfo?.str?.files || ''}`,
				progress: `${usedpace}%`,
				value: usedpace
			},
		]
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
				title: 'widgets.allowedUsers',
				count: users.filter(item => item.state === 1).length
			},
			{
				icon: 'shopping_cart',
				iconColor: 'text-success',
				title: 'widgets.blockedUsers',
				count: users.filter(item => item.state === 2).length
			}
		];
	}
	clearStorage() {
		userService.clearStorage()
			.then(res => {
				NotificationManager.success(`${res.size} cleaned`);
				this.refresh();
			})
			.catch(err => {
				NotificationManager.error("Something went wrong" + err);
			})
	}
	render() {
		const { classes } = this.props;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<Paper className={classes.Paper} square >
							<DynamicDataChart stats={this.getStats()} progressData={this.getProgressData()} clearStorage={this.clearStorage.bind(this)} />
						</Paper>
					</Box>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = ({ users, app }) => {
	return { users, app }
}
export default withRouter(connect(mapStateToProps, { getUsers, getStorageDetail })(withStyles(styles)(withTheme(Dashboard))));