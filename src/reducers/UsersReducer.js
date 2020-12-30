/*
 *
 * Users App Reducers
 */
import {
   GETUSERS,
   GETUSERS_SUCCESS,
   GETUSERS_FAILED
} from 'actions/Types';

const INITIAL_STATE = {
   users: [],
   loading: false,
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      // get recent chat user
      case GETUSERS:
         return { ...state, loading: true };
      case GETUSERS_SUCCESS:
         return { ...state, loading: false, users: action.payload };

      case GETUSERS_FAILED:
         return { ...state, loading: false, users: [], error: action.payload };

      default: return { ...state };
   }
}