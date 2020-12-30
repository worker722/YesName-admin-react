// Redux uses Actions

import {
    GETUSERS,
    GETUSERS_SUCCESS,
    GETUSERS_FAILED
} from './Types'
import { userService } from "../_services";
import { NotificationManager } from 'react-notifications';

export const getUsers = () => (dispatch) => {
    dispatch({ type: GETUSERS });
    userService.getUsers()
        .then(res => {
            if (res.success === true) {
                getUserSuccess(dispatch, res.users);
            } else {
                getUserFailure(dispatch, res);
            }
        })
        .catch((error) => {
            console.log("error", error);
            getUserFailure(dispatch, error);
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
function getUserSuccess(dispatch, users) {
    dispatch({
        type: GETUSERS_SUCCESS,
        payload: users
    });
}

/**
 * Function to get Login user failure 
 */
function getUserFailure(dispatch, error) {
    dispatch({
        type: GETUSERS_FAILED,
        payload: error
    });
    NotificationManager.error(error.message);
}
