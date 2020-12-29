/**
 * Router service file
*/
import Dashboard from 'routes/Dashboard'
import Settings from 'routes/Settings'
export default [
	{
		path: 'dashboard',
		component: Dashboard
	},
	{
		path: 'settings',
		component: Settings
	}
]