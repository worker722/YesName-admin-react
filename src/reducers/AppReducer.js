/*
 *
 * Users App Reducers
 */
import {
  STORAGEINFO
} from 'actions/Types';

const INITIAL_STATE = {
  storageInfo: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORAGEINFO:
      return { ...state, storageInfo: action.payload };
    default: return { ...state };
  }
}