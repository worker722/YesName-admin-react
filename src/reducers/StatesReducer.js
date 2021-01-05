/*
 *
 * Users App Reducers
 */
import {
   GETSTATES,
   GETSTATES_SUCCESS,
   GETSTATES_FAILED
} from 'actions/Types';

const INITIAL_STATE = {
   states: [],
   loading: false,
   error: null
};

export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
      // get recent chat user
      case GETSTATES:
         return { ...state, loading: true };
      case GETSTATES_SUCCESS:
         return { ...state, loading: false, states: action.payload };

      case GETSTATES_FAILED:
         return { ...state, loading: false, states: [], error: action.payload };

      default: return { ...state };
   }
}