/**
 * Auth Actions
 */

import { NotificationManager } from 'react-notifications';
import {
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGIN_EMAIL_CHANGED,
	LOGIN_PASSWORD_CHANGED,
	LOGOUT_USER
} from './Types';
import { userService } from "../_services";

export const signinUser = (user, history) => (dispatch) => {
	dispatch({ type: LOGIN_USER });
	userService.login(user)
		.then(user => {
			if (user.success === true) {
				localStorage.setItem("user", JSON.stringify(user.user));
				loginUserSuccess(dispatch, user.user, history);
			} else {
				loginUserFailure(dispatch, user);
			}
		})
		.catch((error) => {
			console.log("error", error);
			loginUserFailure(dispatch, error);
		})
}

/**
 * @param {*} dispatch 
 * @param {*} user 
 * @param {*} history 
 */

/**
 * Function to check Login user success 
 */
function loginUserSuccess(dispatch, user, history) {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	history.push('/');
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
 */
export const hulkLogout = () => (dispatch) => {
	dispatch({ type: LOGOUT_USER });
	localStorage.removeItem("user");
	NotificationManager.success('User Logged Out');
	// NotificationManager.error("logout error ", error);
}