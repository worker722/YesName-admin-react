/**
 * Custom Table Widget
*/
import React, { Component } from "react";
import MaterialTable from "material-table";
import { withStyles } from '@material-ui/styles';
import { Grid, Box, Typography, Avatar, Tooltip, IconButton } from '@material-ui/core';
import swal from 'sweetalert';

import IntlMessages from 'util/IntlMessages';
import { getLink, date2str } from "helpers";
// Components
import { CustomCard } from 'components/GlobalComponents';
import { userService } from "../../_services";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getUsers } from 'actions';
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
			{ title: 'Avatar', field: 'avatar', render: rowData => <img alt="user-thumb" src={getLink(rowData.avatar)} className="img-50 bdr-rad-50" /> },
			{ title: 'Name', field: 'name' },
			{ title: 'Phone number', field: 'phone' },
			{ title: 'Active', field: 'active', render: rowData => rowData.active === 0 ? "No Verifed" : rowData.active === 1 ? "Active" : rowData.active === 2 ? "Blocked" : rowData.active === 3 ? "Closed" : '' },
			{ title: 'Verified date', field: 'verified_at' },
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
		data: this.props.data,
		selectedRow: null,
		selectedRowForStyle: null
	};
	componentDidMount() {
		this.props.getUsers();
	}
	handleRowClick = (event, rowData) => {
		let tableData = this.state.data;

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
			selectedRow: rowData,
			selectedRowForStyle: rowData
		});
	}
	deleteUser(userid) {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this imaginary file!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					console.log(userid);
					userService.deleteUser(userid)
						.then(res => {
							this.props.getUsers();
							swal("Poof! Your imaginary file has been deleted!", {
								icon: "success",
							})
						})
						.catch(err => console.log(err));;
				} else {
				}
			});
	}
	render() {
		const { classes, loading } = this.props;
		const { selectedRow, data } = this.state;
		return (
			<Grid container spacing={0} className="res-custom-table">
				<Grid item xs={12} sm={12} md={8}>
					<Box className={`custom-table-wrap ${classes.root}`}>
						<MaterialTable
							isLoading={loading}
							title={<IntlMessages id="widgets.users" />}
							columns={this.state.columns}
							data={(data && data.length > 0) ? data : []}
							options={{
								rowStyle: rowData => ({
									backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#f3f7fa' : '#FFF'
								})
							}}
							onRowClick={this.handleRowClick}
						/>
					</Box>
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<CustomCard cardClasses="preview-panel">
						{selectedRow ?
							<>
								<Box mb={2} textAlign="center">
									<Avatar alt="user-thumb" className="avatar-wrap" src={getLink(selectedRow.avatar)} />
									<Box pl={2}>
										<Box fontWeight={500}>{selectedRow.name}</Box>
										<Typography variant="subtitle2">{selectedRow.phone}</Typography>
									</Box>
								</Box>
								<Box mb={2} textAlign="center">
									{/* <Tooltip title="Print" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons-outlined">print</i>
										</IconButton>
									</Tooltip> */}
									<Tooltip title="Edit" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons">edit</i>
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined" onClick={() => this.deleteUser(selectedRow.id)}>
											<i className="material-icons">delete_outline</i>
										</IconButton>
									</Tooltip>
									{/* <Tooltip title="PageView" placement="bottom">
										<IconButton className="preview-icon-btn" variant="outlined">
											<i className="material-icons-outlined">pageview</i>
										</IconButton>
									</Tooltip> */}
								</Box>
								<Box mb={2} className="preview-content">
									<Typography variant="body2">
										<span>Device SN :</span>
										<span>{selectedRow.device}</span>
									</Typography>
									<Typography variant="body2">
										<span>Verified date : </span>
										<span>{date2str(selectedRow.verified_at)}</span>
									</Typography>
									<Typography variant="body2">
										<span>Created date :</span>
										<span>{date2str(selectedRow.created_at)}</span>
									</Typography>
									<Typography variant="body2">
										<span>Updated date :</span>
										<span>{date2str(selectedRow.updated_at)}</span>
									</Typography>
								</Box>
							</>
							:
							null
						}
					</CustomCard>
				</Grid>
			</Grid>
		);
	}
}
export default withRouter(connect(null, { getUsers })(withStyles(styles)(UsersTable)));