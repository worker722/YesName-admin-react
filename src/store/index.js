/**
 * Store
*/
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import logger from "redux-logger";
let middleware = [thunk];
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}
export const store = createStore(reducers, {}, compose(applyMiddleware(...middleware)));