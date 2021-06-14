import { combineReducers } from 'redux'
import AuthUserReducer from './AuthUserReducer'
import AppSettingsReducer from './AppSettingsReducer'
import MenuListReducer from './MenuListReducer'
import UsersReducer from './UsersReducer'
import StatesReducer from './StatesReducer'
import AppReducer from './AppReducer'



const reducers = combineReducers({
	authUser: AuthUserReducer,
	settings: AppSettingsReducer,
	menuListReducer: MenuListReducer,
	users: UsersReducer,
	states: StatesReducer,
	app: AppReducer
});

export default reducers;