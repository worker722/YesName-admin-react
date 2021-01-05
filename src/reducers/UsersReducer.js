/*
 *
 * Users App Reducers
 */
import {
   GETUSERS,
   GETUSERS_SUCCESS,
   GETUSERS_FAILED,
   GETFRIENDS,
   GETFRIENDS_SUCCESS,
   GETFRIENDS_FAILED
} from 'actions/Types';

const INITIAL_STATE = {
   users: [],
   loading: false,
   userid: 0,
   friends: [],
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case GETUSERS:
         return { ...state, loading: true, userid: 0 };
      case GETUSERS_SUCCESS:
         return { ...state, loading: false, users: action.payload };
      case GETUSERS_FAILED:
         return { ...state, loading: false, users: [] };

      case GETFRIENDS:
         return { ...state, loading: false, userid: action.payload };
      case GETFRIENDS_SUCCESS:
         return { ...state, loading: false, friends: action.payload };
      case GETFRIENDS_FAILED:
         return { ...state, loading: false, friends: [] };

      default: return { ...state };
   }
}