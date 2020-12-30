/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container, Box, TextField, Dialog, Button, DialogActions, DialogContent, Avatar, DialogTitle } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import 'video-react/dist/video-react.css';
import UsersTable from "components/Widgets/UsersTable";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { getUsers } from 'actions';
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

class Users extends Component {
	state = {
		dialog_visible: false,
		edit_user: {
			id: 0
		}
	}
	componentDidMount() {
		this.props.getUsers();
	}
	openDialog() {
		this.setState({ dialog_visible: true });
	};

	closeDialog() {
		this.setState({ dialog_visible: false });
	};
	saveDialog() {

	}
	onEdit(id) {
		this.openDialog();
		this.setState({ edit_user: { id } });
		console.log(id);
	}

	render() {
		const { users } = this.props;
		console.log(styles.large);
		const { dialog_visible, edit_user } = this.state;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<UsersTable data={users.users} loading={users.loading} onEdit={this.onEdit.bind(this)} />
					</Box>
				</Container>
				<Dialog open={dialog_visible} onClose={this.closeDialog.bind(this)} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title">{edit_user?.id > 0 ? "Edit " : "Add "}User</DialogTitle>
					<DialogContent>
						<Avatar alt="user-thumb" className={styles.large} src={edit_user?.avatar} />
						<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
						<TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth />
					</DialogContent>
					<DialogActions>
						<Button onClick={this.closeDialog.bind(this)} color="primary">
							Cancel
          </Button>
						<Button onClick={this.saveDialog.bind(this)} color="primary">
							Subscribe
          </Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
const mapStateToProps = ({ users }) => {
	return { users }
}
export default withRouter(connect(mapStateToProps, { getUsers })(withStyles(styles)(withTheme(Users))));