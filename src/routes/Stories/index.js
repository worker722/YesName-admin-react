/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import 'video-react/dist/video-react.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
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

class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
				</Container>
			</div>
		);
	}
}
const mapStateToProps = (state) => (state)
const dispatchToProps = { ...actions };
export default withRouter(connect(mapStateToProps, dispatchToProps)(withStyles(styles)(withTheme(Users))));