/**
 *  App.js :: contains main layout of APP.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import HulkThemeProvider from './HulkThemeProvider';
import { NotificationContainer } from 'react-notifications';
import { CssBaseline } from '@material-ui/core';

// APP signin and signup imports
import AppSignin from './Signin/SigninFirebase';
import AppSignup from './Signup/SignupFirebase';
import AppForgotPassword from './ForgotPassword/ForgotPassword';
import Login from './Login';
import Register from './Register';
import ForgotPassword2 from './ForgotPassword2';

// deafult layout
import DefaultLayout from './DefaultLayout'


/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, authUser, ...rest }) =>
	<Route
		{...rest}
		render={props =>
			authUser
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/signin',
						state: { from: props.location }
					}}
				/>}
	/>;

class App extends Component {
	render() {
		const { location, match, user } = this.props;
		if (location.pathname === "/") {
			if (user === null) {
				return (<Redirect to="/signin" />);
			} else {
				return (<Redirect to="/app/dashboard/dashboard1" />);
			}
		}
		return (
         <HulkThemeProvider>
				<CssBaseline />
				<NotificationContainer />
				<InitialPath
					path={`${match.url}app`}
					authUser={user}
					component={DefaultLayout}
				/>
				<Route path="/signin" component={AppSignin} />
				<Route path="/signup" component={AppSignup} />
				<Route path="/forgot-password" component={AppForgotPassword} />
				<Route path="/login" component={Login} />
				<Route path="/register" component={Register} />
				<Route path="/forgot-password2" component={ForgotPassword2} />
         </HulkThemeProvider>
		);
	}
}

//map state to props
const mapStateToProps = ({ authUser }) => {
	const { user } = authUser;
	return { user };
};

export default connect(mapStateToProps)(App);