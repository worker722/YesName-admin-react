/**
 * Custom Table Widget
*/
import React, { Component } from "react";
import MaterialTable from "material-table";
import { withStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Avatar, Tooltip, IconButton, Button } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';
import swal from 'sweetalert';
import { withTheme } from '@material-ui/core/styles';

import IntlMessages from 'util/IntlMessages';
import { getLink, date2str } from "helpers";
// Components
import { CustomCard } from 'components/GlobalComponents';
import { userService } from "../../_services";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getUsers, getFriends } from 'actions';
const styles = theme => ({
	root: {
		'& .MuiTableCell-paddingNone': {
			padding: '0 16px',
		},
		'& .MuiTableCell-body': {
			lineHeight: 1,
		},
		'& .MuiToolbar-root': {
			paddingRight: 20,
			'& >div:first-child': {
				fontSize: '1.25rem',
				fontFamily: "'Roboto', sans-serif",
				fontWeight: 500,
			}
		}
	},
	content: {

	},
	menuButton: {

	}
});

class UsersTable extends Component {
	state = {
		columns: [
			{ title: 'Avatar', field: 'avatar', render: rowData => <Avatar alt={rowData.name?.toUpperCase()} className="img-60 bdr-rad-60" src={getLink(rowData.avatar)} /> },
			{ title: 'Name', field: 'name' },
			{ title: 'Phone number', field: 'phone' },
			{ title: 'Active', field: 'active', render: rowData => rowData.active === 0 ? "No Verifed" : rowData.active === 1 ? "Active" : rowData.active === 2 ? "Blocked" : rowData.active === 3 ? "Closed" : '' },
			{ title: 'Verified date', field: 'verified_at', render: rowData => date2str(rowData.verified_at) },
			// date2str
			{
				title: 'Registered date', field: 'created_at', render: rowData =>
					<div>
						<span className="thisIsClass">
							{date2str(rowData.created_at)}
						</span>
						{rowData.icon ?
							<span className="custom-table-arrow">
								<i className="material-icons">arrow_forward_ios</i>
							</span>
							:
							<span></span>
						}
					</div>
			},
		],
		selectedRow: null
	};
	componentDidMount() {
		this.props.getUsers();
	}
	closePreview = () => {
		let tableData = this.props.data;

		for (let i = 0; i < tableData.length; i++) {
			tableData[i].icon = false
		}
		this.setState({
			selectedRow: null
		});
	}
	handleRowClick = (event, rowData) => {
		let tableData = this.props.data;

		for (let i = 0; i < tableData.length; i++) {
			if (tableData[i].icon === true) {
				if (i === rowData.tableData.id) {
					tableData[i].icon = true
				} else {
					tableData[i].icon = false;
				}
			} else {
				if (i === rowData.tableData.id) {
					tableData[i].icon = true
				}
			}
		}
		this.setState({
			selectedRow: rowData
		});
	}
	deleteUser(userid) {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this user!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					userService.deleteUser(userid)
						.then(res => {
							const { selected_user } = this.props;
							if (selected_user && selected_user.id > 0) {
								this.props.getFriends(selected_user.id);
							} else {
								this.props.getUsers();
							}
							this.setState({ selectedRow: null });
							swal("Poof! User has been deleted!", {
								icon: "success",
							});
						})
						.catch(err => console.log(err));;
				} else {
				}
			});
	}
	render() {
		const { classes, loading, data, selected_user } = this.props;
		const { selectedRow } = this.state;
		return (
			<Grid container spacing={0} className="res-custom-table">
				<Grid item xs={12} sm={12} md={selectedRow ? 8 : 12}>
					<Box className={`custom-table-wrap ${classes.root}`}>
						{selected_user &&
							<Button size="small" style={{ marginLeft: 20, position: "absolute", left: "20%", zIndex: 99999999, top: 40 }} onClick={() => this.props.getUsers()} variant="contained" color="primary">Show all Users</Button>
						}
						<MaterialTable
							isLoading={loading}
							title={
								selected_user ?
									<div style={{ display: "inline-flex" }}>
										<Avatar alt={selected_user.name?.toUpperCase()} className="img-60 bdr-rad-60" src={getLink(selected_user.avatar)} />
										<span style={{ marginLeft: 10, alignSelf: "flex-end" }} >Friends</span>
									</div>

									:
									<IntlMessages id="widgets.users" />
							}
							columns={this.state.columns}
							data={(data && data.length > 0) ? data : []}
							options={{
								rowStyle: rowData => ({
									backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#f3f7fa' : '#FFF'
								})
							}}
							onRowClick={this.handleRowClick}
						/>
					</Box>
				</Grid>
				{selectedRow &&
					<Grid item xs={12} sm={12} md={4}>
						<CustomCard cardClasses="preview-panel">
							<Box md={12} textAlign="right">
								<ClearIcon style={{ fontSize: 25, cursor: "pointer" }} onClick={this.closePreview.bind(this)} />
							</Box>
							<Box mb={2} textAlign="center">
								<Avatar alt={selectedRow.name?.toUpperCase()} className="avatar-wrap" src={getLink(selectedRow.avatar)} />
								<Box>
									<Box fontWeight={500}>{selectedRow.name}</Box>
									<Typography variant="subtitle2">{selectedRow.phone}</Typography>
								</Box>
							</Box>
							<Box mb={2} textAlign="center">
								{/* <Tooltip title="Friends" placement="bottom">
									<IconButton className="preview-icon-btn" variant="outlined" onClick={() => { this.props.getFriends(selectedRow.id); this.closePreview(); }}>
										<i className="material-icons-outlined">nature_people</i>
									</IconButton>
								</Tooltip> */}
								<Tooltip title="Edit" placement="bottom">
									<IconButton className="preview-icon-btn" variant="outlined" onClick={() => this.props.onEdit(selectedRow.id)}>
										<i className="material-icons">edit</i>
									</IconButton>
								</Tooltip>
								<Tooltip title="Delete" placement="bottom">
									<IconButton className="preview-icon-btn" variant="outlined" onClick={() => this.deleteUser(selectedRow.id)}>
										<i className="material-icons">delete_outline</i>
									</IconButton>
								</Tooltip>
							</Box>
							<Box mb={2} className="preview-content">
								<Typography variant="body2">
									<span>Device SN :</span>
									<span>{selectedRow.device}</span>
								</Typography>
								<Typography variant="body2">
									<span>State :</span>
									<span>{selectedRow.state}
									</span>
								</Typography>
								<Typography variant="body2">
									<span>Intro Video :</span>
									<span>{selectedRow.visit_intro === 1 ? "Visited" : ""}
									</span>
								</Typography>
								<Typography variant="body2">
									<span>Invite Friend :</span>
									<span>{selectedRow.visit_invite === 1 ? "Visited" : ""}
									</span>
								</Typography>
								<Typography variant="body2">
									<span>Verified date : </span>
									<span>{date2str(selectedRow.verified_at)}</span>
								</Typography>
								<Typography variant="body2">
									<span>Updated date :</span>
									<span>{date2str(selectedRow.updated_at)}</span>
								</Typography>
							</Box>
						</CustomCard>
					</Grid>
				}
			</Grid>
		);
	}
}
export default withRouter(connect(null, { getUsers, getFriends })(withStyles(styles)(withTheme(UsersTable))));