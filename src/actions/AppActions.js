// Redux uses Actions

import {
    STORAGEINFO,
} from './Types'
import { userService } from "../_services";

export const getStorageDetail = () => (dispatch) => {
    userService.getStorageDetail()
        .then(res => {

            dispatch({ type: STORAGEINFO, payload: res });
        })
        .catch((error) => {
            console.error(error);
            dispatch({ type: STORAGEINFO, payload: [] });
        })
}