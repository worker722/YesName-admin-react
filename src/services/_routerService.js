/**
 * Router service file
*/
import Dashboard from 'routes/Dashboard'
import Settings from 'routes/Settings'
import Users from 'routes/Users'
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
	}
]