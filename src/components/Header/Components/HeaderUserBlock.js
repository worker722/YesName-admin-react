/**
 * User Block Section
*/
import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import { IconButton, List, ListItem, Button, ListSubheader, Typography, Popover, Tooltip, Avatar } from '@material-ui/core';

// redux action
import { hulkLogout } from 'actions';

const styles = theme => ({
	root: {
		width: '100%',
		minWidth: 300,
		padding: 0,
		'& >a': {
			color: theme.palette.text.primary,
			'&:hover': {
				backgroundColor: 'rgba(0,0,0,0.05)'
			}
		},
		'& .top-dropdown-menu--item': {
			padding: '20px 12px',
			borderTop: `1px solid ${theme.palette.divider}`,
		}
	},
	large: {
		width: theme.spacing(10),
		height: theme.spacing(10),
	},
});

class HeaderUserBlock extends Component {
	constructor(props) {
		super(props)
		this.confirmationDialog = React.createRef();
		this.state = {
			anchorEl: null,
		};
	}

	//Define function for open dropdown
	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget,
		});
	};


	//Define function for close dropdown
	handleClose = () => {
		this.setState({
			anchorEl: null,
		});
	};
	/*
	 * Logout User
	 */
	logoutUser = () => {
		this.setState(
			{
				anchorEl: null,
			}
		)
		this.props.hulkLogout();
	}

	render() {
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const { classes, authUser: { user } } = this.props;
		return (
			<div>
				<Tooltip title="User Profile" placement="bottom">
					<IconButton aria-describedby={open ? 'simple-popper' : null} variant="contained" color="primary"
						style={{ padding: '6px' }}
						onClick={this.handleClick}>
						<Avatar alt="user-thumb" src={user?.avatar} />
					</IconButton>
				</Tooltip>
				<Popover
					id="simple-popper"
					open={open}
					anchorEl={anchorEl}
					onClose={this.handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				>
					<Fragment>
						<List className={`${classes.root} top-dropdown-menu`}
							component="nav"
							aria-labelledby="nested-list-subheader"
							subheader={
								<ListSubheader component="div" id="nested-list-subheader">
									<div className="dropdown-header user-info  text-center">
										<Avatar alt="user-thumb" className={classes.large} src={user?.avatar} />
										<Typography variant="body2">{user?.name}</Typography>
										<Typography variant="subtitle2">{user?.phone}</Typography>
										<Button className="btn primary-bg-btn" component={Link} to="/app/profile" variant="outlined" color="primary">
											Manage your account
										</Button>
									</div>
								</ListSubheader>
							}
						>
							<ListItem component="div" className="top-dropdown-menu--item d-block text-center">
								<Button variant="contained" color="primary" onClick={this.logoutUser}>
									Sign out
        						</Button>
							</ListItem>
						</List>
					</Fragment>
				</Popover>
			</div>
		);
	}
}

const mapStateToProps = ({ authUser, settings }) => {
	return { authUser, settings };
}

export default withRouter(connect(mapStateToProps, {
	hulkLogout
})(withStyles(styles)(HeaderUserBlock)));