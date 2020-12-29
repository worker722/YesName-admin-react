/**
 * Main APP
 */
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// App Conatiner
import App from './container/App';

// Hulk CSS
import './lib/hulkCss';

// Store
import { store } from './store';

function MainApp() {
	return (
      <Provider store={store}>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<Router>
					<Switch>
						<Route path="/" component={App} />
					</Switch>
				</Router>
			</MuiPickersUtilsProvider>
      </Provider>
	);
}

export default MainApp;