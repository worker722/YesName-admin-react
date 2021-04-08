/**
 * App Config File
*/
const DEBUGGING = false;
const PRODUCTION = true;

const AppConfig = {
	brandName: 'MoRe',
	copyRightText: 'Copyright © 2021',
	debugging: DEBUGGING,
	SERVER_HOST: PRODUCTION ? "http://tntest.terasys-network.info:3333" : "http://localhost:3333",
	navCollapsed: true,
	mobileSidebarToggle: false,
	isDarkModeActive: false,
	isRtlActive: false,
	isHorizontalMenuActive: false,
	isMiniSidebarActive: false,
	selectedThemeColor: 'light-theme',
	locale: {
		languageId: 'english',
		locale: 'en',
		name: 'English',
		icon: 'usa.png',
	},
	// Default Theme Colors 
	lightThemeColors: {
		'primary': '#4d7df2',
		'secondary': '#ff8600',
		'success': '#00d41a',
		'info': '#00d0bd',
		'warning': '#ffb70f',
		'error': '#e53935',
		'textPrimary': '#29303b',
		'textSecondary': '#717275',
		'divider': '#e0e0e0',
		'icon': '#717275',
		'bgPaper': '#FFFFFF',
		'bgDefault': '#f3f7fa',
		'white': '#ffffff',
		'black': '#000000'
	},
	// Teal Theme Colors
	tealThemeColors: {
		'primary': '#028484',
		'secondary': '#d99830',
		'success': '#00d41a',
		'info': '#00d0bd',
		'warning': '#ffb70f',
		'error': '#e64c3d ',
		'textPrimary': '#29303b',
		'textSecondary': '#717275',
		'divider': '#e0e0e0',
		'icon': '#717275',
		'bgPaper': '#FFFFFF',
		'bgDefault': '#f3f7fa',
		'white': '#ffffff',
		'black': '#000000'
	},
	// Violet Theme Colors
	violetThemeColors: {
		'primary': '#53419A',
		'secondary': '#F0bc02',
		'success': '#ff8600',
		'info': '#00d0bd',
		'warning': '#ffb70f',
		'error': '#e53935',
		'textPrimary': '#29303b',
		'textSecondary': '#717275',
		'divider': '#e0e0e0',
		'icon': '#717275',
		'bgPaper': '#FFFFFF',
		'bgDefault': '#f3f7fa',
		'white': '#ffffff',
		'black': '#000000'
	},
	// Dark Theme Colors
	darkThemeColors: {
		'primary': '#4d7df2',
		'secondary': '#ff8600',
		'success': '#00d41a',
		'info': '#00d0bd',
		'warning': '#ffb70f',
		'error': '#e53935',
		'textPrimary': '#9d9daf',
		'textSecondary': '#717275',
		'divider': 'rgba(255,255,255,0.12)',
		'icon': '#717275',
		'bgPaper': '#27293c',
		'bgDefault': '#1e1e2e',
		'white': '#ffffff',
		'black': '#000000'
	}
}

export default AppConfig;