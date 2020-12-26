/**
 * Code splitting Components
 * AsyncComponents
*/
import React from 'react';
import Loadable from 'react-loadable';
import { HulkPageLoader } from '../GlobalComponents';

// Dasboard Urls
const AsyncFullPageUrlsComponent = Loadable({
   loader: () => import("routes/FullPageUrls"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
//  Dashboard 1
const AsyncDashboard1Component = Loadable({
	loader: () => import("routes/Dashboard/Dashboard1"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});

// Dashboard 2
const AsyncDashboard2Component = Loadable({
	loader: () => import("routes/Dashboard/Dashboard2"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});
// Dashboard 3
const AsyncDashboard3Component = Loadable({
	loader: () => import("routes/Dashboard/Dashboard3"),
	loading: () => <HulkPageLoader />,
	delay: 3000,
});


export {
   AsyncFullPageUrlsComponent,
	AsyncDashboard1Component,
	AsyncDashboard2Component,
	AsyncDashboard3Component
};