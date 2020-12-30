import { combineReducers } from 'redux'
import AuthUserReducer from './AuthUserReducer'
import AppSettingsReducer from './AppSettingsReducer'
import MenuListReducer from './MenuListReducer'
import UsersReducer from './UsersReducer'



const reducers = combineReducers({
	authUser: AuthUserReducer,
	settings: AppSettingsReducer,
	menuListReducer: MenuListReducer,
	users: UsersReducer
});

export default reducers;