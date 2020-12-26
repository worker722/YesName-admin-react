/**
 * Auth Actions
 */

import firebase from '@firebase/app';
import { NotificationManager } from 'react-notifications';
import '@firebase/auth';
//Action types
import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SIGNUP_USER,
	LOGIN_EMAIL_CHANGED,
	LOGIN_PASSWORD_CHANGED,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
	LOGOUT_USER
} from './Types';

/**
 * Function to signin using firebase
 */
export const signinUserWithFirebase = (user, history) => (dispatch) => {
	dispatch({ type: LOGIN_USER });
	firebase.auth().signInWithEmailAndPassword(user.email, user.password)
		.then(user => {
			localStorage.setItem("user_id", JSON.stringify(user.user.uid));
			loginUserSuccess(dispatch, localStorage.getItem("user_id"), history);
		})
		.catch((error) => {
			console.log("error", error);
			loginUserFailure(dispatch, error);
		})
}

/**
 * Function to create firebase account
 * @param {*} dispatch 
 * @param {*} user 
 * @param {*} history 
 */
export const signupUserWithFirebase = (user, history) => (dispatch) => {
	dispatch({ type: SIGNUP_USER });
	firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
		.then((user) => {
			localStorage.setItem("user_id", user.user.uid);
			signupUserSuccess(dispatch, localStorage.getItem("user_id"), history);
		})
		.catch((error) => {
			console.log(error);
			signupUserFailure(dispatch, error);
		});
}

/**
 * Function to check Login user success 
 */
function loginUserSuccess(dispatch, user, history) {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	history.push('/app/dashboard/dashboard1');
	NotificationManager.success('User Logged In');
}

/**
 * Function to get Login user failure 
 */
function loginUserFailure(dispatch, error) {
	dispatch({
		type: LOGIN_USER_FAILURE,
		payload: error
	});
	NotificationManager.error(error.message);
}

/**
 * Signup user success
 */
function signupUserSuccess(dispatch, user, history) {
	dispatch({
		type: SIGNUP_USER_SUCCESS,
		payload: user
	});
	history.push('/app/dashboard/dashboard1');
	NotificationManager.success('Account Created');
}

/**
 * Signup user failure
 */
function signupUserFailure(dispatch, error) {
	dispatch({
		type: SIGNUP_USER_FAILURE,
		payload: error
	});
	NotificationManager.error(error.message);
}

/**
 * Function to detect email changes
 */
export function onEmailChanged(email) {
	return {
		type: LOGIN_EMAIL_CHANGED,
		payload: email
	}
}

/**
 * Function to detect password change
 */
export function onPasswordChanged(password) {
	return {
		type: LOGIN_PASSWORD_CHANGED,
		payload: password
	}
}

/**
 * Redux Action To Signin User In Firebase With Facebook
 */
export const signinUserWithFacebook = (history) => (dispatch) => {
	dispatch({ type: LOGIN_USER })
	const provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider)
		.then(function (result) {
			console.log("result::", result);
		}).catch(function (error) {
			console.log("error::", error);
		})
}


/**
 * Redux Action To Signin User In Firebase With Google
 */
export const signinUserWithGoogle = (history) => (dispatch) => {
	dispatch({ type: LOGIN_USER });
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function (result) {
		localStorage.setItem("user_id", "user-id");
		dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
		history.push('/');
		NotificationManager.success('User Login Successfully');
	}).catch(function (error) {
		dispatch({ type: LOGIN_USER_FAILURE, payload: error });
		NotificationManager.error(error.message);
	});
}

/**
 * Redux Action To Signin User In Firebase With Github
 */
export const signinUserWithGithub = (history) => (dispatch) => {
	dispatch({ type: LOGIN_USER });
	const provider = new firebase.auth.GithubAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function (result) {
		localStorage.setItem("user_id", "user-id");
		dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
		history.push('/');
		NotificationManager.success('User Login Successfully');
	}).catch(function (error) {
		dispatch({ type: LOGIN_USER_FAILURE });
		NotificationManager.error(error.message);
	});
}

/**
 * Redux Action To Signin User In Firebase With Twitter
 */
export const signinUserWithTwitter = (history) => (dispatch) => {
	dispatch({ type: LOGIN_USER });
	const provider = new firebase.auth.TwitterAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function (result) {
		localStorage.setItem("user_id", "user-id");
		dispatch({ type: LOGIN_USER_SUCCESS, payload: localStorage.getItem('user_id') });
		history.push('/');
		NotificationManager.success('User Login Successfully!');
	}).catch(function (error) {
		dispatch({ type: LOGIN_USER_FAILURE });
		NotificationManager.error(error.message);
	});
}

/**
 * Redux action to logout user from firebase
 */
export const hulkLogoutUserFirebase = () => (dispatch) => {
	firebase.auth().signOut()
		.then(() => {
			dispatch({ type: LOGOUT_USER });
			localStorage.removeItem("user_id");
			NotificationManager.success('User Logged Out');
		})
		.catch((error) => {
			NotificationManager.error("Firebase logout error::", error);
		});
}