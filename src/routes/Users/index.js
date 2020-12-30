/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container, Box } from '@material-ui/core';
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
	componentDidMount() {
		console.log("-------------users---------------");
		this.props.getUsers();
	}

	render() {
		const { users } = this.props;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<UsersTable data={users.users} loading={users.loading} />
					</Box>
				</Container>
			</div>
		);
	}
}
const mapStateToProps = ({ users }) => {
	return { users }
}
export default withRouter(connect(mapStateToProps, { getUsers })(withStyles(styles)(withTheme(Users))));