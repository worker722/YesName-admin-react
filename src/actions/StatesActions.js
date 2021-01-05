// Redux uses Actions

import {
    GETSTATES,
    GETSTATES_SUCCESS,
    GETSTATES_FAILED,
} from './Types'
import { userService } from "../_services";
import { NotificationManager } from 'react-notifications';

export const getStates = () => (dispatch) => {
    dispatch({ type: GETSTATES });
    userService.getStates()
        .then(res => {
            if (res.success === true) {
                getStatesSuccess(dispatch, res.states);
            } else {
                getStatesFailure(dispatch, res);
            }
        })
        .catch((error) => {
            getStatesFailure(dispatch, error);
        })
}

/**
 * @param {*} dispatch 
 * @param {*} states 
 */

/**
 * Function to check Login user success 
 */
function getStatesSuccess(dispatch, states) {
    dispatch({
        type: GETSTATES_SUCCESS,
        payload: states
    });
}

/**
 * Function to get Login user failure 
 */
function getStatesFailure(dispatch, error) {
    dispatch({
        type: GETSTATES_FAILED,
        payload: error
    });
    NotificationManager.error(error.message);
}
