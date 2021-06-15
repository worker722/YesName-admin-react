/**
 * Router service file
*/
import Dashboard from 'routes/Dashboard'
import Settings from 'routes/Settings'
import Users from 'routes/Users'
import Stories from 'routes/Stories'
import UserSettings from 'routes/UserSettings'
import Chat from 'routes/Chat'

export default [
	{
		path: 'dashboard',
		component: Dashboard
	},
	{
		path: 'settings',
		component: Settings
	},
	{
		path: 'users',
		component: Users
	},
	{
		path: 'stories',
		component: Stories
	},
	{
		path: 'profile',
		component: UserSettings
	},
	{
		path: 'chat',
		component: Chat
	}
]