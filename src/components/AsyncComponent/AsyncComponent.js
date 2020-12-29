/**
 * Code splitting Components
 * AsyncComponents
*/
import React from 'react';
import Loadable from 'react-loadable';
import { HulkPageLoader } from '../GlobalComponents';

const AsyncDashboardComponent = Loadable({
	loader: () => import("routes/Dashboard"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
const AsyncSettingsComponent = Loadable({
	loader: () => import("routes/settings"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
export {
	AsyncDashboardComponent,
	AsyncSettings
};