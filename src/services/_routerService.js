/**
 * Router service file
*/
import Dashboard from 'routes/Dashboard'
import FullPageMenu from 'routes/FullPageMenu'

export default [
   {
      path: 'fullpagemenu',
      component: FullPageMenu
   },
	{
		path: 'dashboard',
		component: Dashboard
	}
]