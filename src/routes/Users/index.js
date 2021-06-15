/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container, Box, TextField, Dialog, Button, DialogActions, DialogContent, Avatar, DialogTitle, Badge, Select, MenuItem, Grid, InputLabel, Switch, LinearProgress } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import 'video-react/dist/video-react.css';
import UsersTable from "components/Widgets/UsersTable";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getLink } from "helpers";
import { Edit as EditIcon, Clear as ClearIcon } from '@material-ui/icons';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { userService } from "../../_services";
import { NotificationManager } from 'react-notifications';
import * as actions from 'actions';

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
});
const ClearBadge = withStyles((theme) => ({
	root: {
		fontSize: 25,
		cursor: "pointer"
	},
}))(ClearIcon);
const EditBadge = withStyles((theme) => ({
	root: {
		fontSize: 25,
		cursor: "pointer"
	},
}))(EditIcon);

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dialog_visible: false,
			loading: false,
			edit_user: {
				id: 0
			},
			avatar: {
				uri: null,
				data: null
			},
		}
	}
	componentDidMount() {
		this.props.getUsers();
		this.props.getStates();
	}
	openDialog() {
		this.setState({ dialog_visible: true });
	};

	closeDialog() {
		this.setState({ dialog_visible: false });
	};
	async saveDialog() {
		const { avatar, edit_user } = this.state;
		this.setState({ loading: true });
		try {
			let avatar_path = edit_user.avatar;
			if (avatar && avatar.data) {
				const upload_res = await userService.uploadFile(avatar.data);
				if (upload_res.data.success) {
					avatar_path = upload_res.data.path;
					this.changeUser({ avatar: avatar_path });
				} else {
					throw new Error("User Avatar upload failed, Please try again");
				}
			}
			const data = {
				avatar: avatar_path,
				n_state: edit_user.n_state,
				name: edit_user.name,
				phone: edit_user.phone,
				active: edit_user.active,
				visit_intro: edit_user.visit_intro,
				visit_invite: edit_user.visit_invite,
			};
			const update_res = await userService.updateUser(edit_user.id, data);
			if (update_res.success) {
				if (this.props.users?.userid > 0) {
					this.props.getFriends(this.props.users?.userid);
				} else {
					this.props.getUsers();
				}
				NotificationManager.success("Successfully updated");
			} else {
				throw new Error("Something went wrong");
			}
		} catch (err) {
			NotificationManager.error(err.message);
		}
		this.setState({ loading: false, dialog_visible: false, avatar: null });
	}
	onEdit(id) {
		const { users } = this.props;
		const edit_user = users.users?.find(item => item.id === id);
		this.setState({ edit_user });
		this.openDialog();
	}
	chooseFile() {
		document.getElementById("avatar").click();
	}
	changeAvatar(e) {
		const data = e.target.files[0];
		this.setState({
			avatar: {
				uri: URL.createObjectURL(data),
				data
			}
		})
	}
	changeUser(item) {
		this.setState({
			edit_user: {
				...this.state.edit_user,
				...item
			}
		})
	}
	selected_user() {
		const { users } = this.props;
		try {
			if (users.userid > 0) return users.users.find(item => item.id === users.userid);
		} catch (err) {

		}
		return null;
	}
	render() {
		const { users, states: { states } } = this.props;
		const { dialog_visible, edit_user, avatar, loading } = this.state;
		return (
			<div className="new-dashboard">
				{users.loading && <LinearProgress style={{ height: 6 }} />}
				<Container maxWidth="lg">
					<Box pt={3}>
						<UsersTable
							data={users?.users?.map(item => ({ ...item, connected: users.connectedUser.find(usr => usr.userid === item.id) }))}
							loading={users.loading}
							onEdit={this.onEdit.bind(this)}
							selected_user={this.selected_user()}
						/>
					</Box>
				</Container>
				<Dialog open={dialog_visible} onClose={this.closeDialog.bind(this)} aria-labelledby="form-dialog-title">
					{loading && <LinearProgress style={{ height: 6 }} />}
					<DialogTitle id="form-dialog-title">{edit_user?.id > 0 ? "Edit " : "Add "}User</DialogTitle>
					<DialogContent>
						<Box style={{ textAlign: "center" }}>
							<Badge overlap="circle" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} badgeContent={
								(avatar?.uri || getLink(edit_user?.avatar)) && <ClearBadge onClick={() => { this.setState({ avatar: null }); this.changeUser({ avatar: null }) }} />
							}>
								<Badge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} badgeContent={
									<EditBadge onClick={() => this.chooseFile()} />
								}>
									<Avatar alt={edit_user?.name?.toUpperCase()} className="avatar-wrap" src={avatar?.uri || getLink(edit_user?.avatar)} />
								</Badge>
							</Badge>
							<input type="file" accept="image/*" id="avatar" hidden onChange={(e) => this.changeAvatar(e)} />
						</Box>
						<TextField autoFocus margin="dense" id="name" label="User Name" type="text" fullWidth value={edit_user?.name} onChange={(event) => this.changeUser({ name: event.target.value })} />
						{/* <TextField margin="dense" id="phone" label="Phone number" type="text" fullWidth value={edit_user?.phone} onChange={(event) => this.changeUser({ phone: event.target.value })} /> */}
						<InputLabel style={{ marginTop: 8 }} shrink id="state_label">Phone number</InputLabel>
						<PhoneInput
							style={{ width: "100%" }}
							country={'us'}
							value={edit_user?.phone}
							onChange={phone => this.changeUser({ phone })}
						/>
						<TextField style={{ marginTop: 8 }} margin="dense" id="device" label="Device" type="text" fullWidth value={edit_user?.device} disabled />
						<Grid container spacing={3} style={{ marginTop: 8 }}>
							<Grid item md={3}>
								<InputLabel shrink id="state_label">Account State</InputLabel>
								<Select
									style={{ width: "100%" }}
									value={edit_user?.active || 0}
									onChange={(event) => this.changeUser({ active: event.target.value })}
									displayEmpty
								>
									<MenuItem value={0}>No Verifed</MenuItem>
									<MenuItem value={1}>Active</MenuItem>
									<MenuItem value={2}>Blocked</MenuItem>
									<MenuItem value={3}>Closed</MenuItem>
								</Select>
							</Grid>
							<Grid item md={3}>
								<InputLabel shrink id="state_label">User State</InputLabel>
								<Select
									style={{ width: "100%" }}
									value={edit_user?.n_state || 0}
									onChange={(event) => this.changeUser({ n_state: event.target.value })}
									displayEmpty
								>
									<MenuItem value={0}><em>None</em></MenuItem>
									{states && states.length > 0 &&
										states.map((item, index) => <MenuItem value={item.id}>{item.state}</MenuItem>)
									}
								</Select>
							</Grid>
							<Grid item md={3}>
								<InputLabel shrink id="state_label">Viste Intro page</InputLabel>
								<Switch
									checked={edit_user?.visit_intro}
									onChange={(event) => this.changeUser({ visit_intro: event.target.checked })}
									color="primary"
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>
							</Grid>
							<Grid item md={3}>
								<InputLabel shrink id="state_label">Viste Invite page</InputLabel>
								<Switch
									checked={edit_user?.visit_invite}
									onChange={(event) => this.changeUser({ visit_invite: event.target.checked })}
									color="primary"
									inputProps={{ 'aria-label': 'primary checkbox' }}
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions style={{ padding: 20 }}>
						<Button variant="contained" onClick={this.saveDialog.bind(this)} color="primary" disabled={loading}> Update </Button>
						<Button onClick={this.closeDialog.bind(this)} color="primary" disabled={loading}> Cancel </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
const mapStateToProps = (state) => (state)
const dispatchToProps = { ...actions };
export default withRouter(connect(mapStateToProps, dispatchToProps)(withStyles(styles)(withTheme(Users))));