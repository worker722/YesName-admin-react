/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { AppBar, Toolbar, Tooltip, IconButton, Box, Hidden, Icon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HorizontalMenu from 'components/HorizontalMenu/HorizontalMenu.js'

//component
import FullScreen from './Components/FullScreen';
import Notification from './Components/Notifications';
import LanguageProvider from './Components/LanguageProvider'
import HeaderUserBlock from './Components/HeaderUserBlock';

import GlobalSearch from 'components/GlobalComponents/GlobalSearch'
import { darkModeAction } from 'actions';

const drawerWidth = 260;

const styles = theme => ({
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth + 'px',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	contentJustify: {
		justifyContent: 'space-between'
	},
	menuButton: {
		marginLeft: '-80px',
		color: theme.palette.common.white,
		marginRight: theme.spacing(2),
		'& .MuiSvgIcon-root': {
			fontSize: '1.8125rem'
		},
		[theme.breakpoints.down('md')]: {
			marginLeft: '-6px',
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: '-7px',
		},
	},
	textLight: {
		color: theme.palette.text.primary,
	},
	ToggleBtn: {
		marginLeft: '-12px',
		color: theme.palette.text.primary,
		transition: theme.transitions.create(['margin'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	searchBar: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		padding: '0 17px 0 35px',
		zIndex: 99,
		opacity: 0,
		visibility: 'hidden',
		transform: 'translateX(40px) scale(0.95)',
		transition: 'all 0.2s ease 0s',
		backgroundColor: theme.palette.background.paper,
		display: "flex",
		alignItems: "center",
		'& input': {
			fontSize: 22,
		},
		[theme.breakpoints.down('xs')]: {
			padding: '0 1px 0 15px',
		}
	},
	activeBar: {
		opacity: 1,
		visibility: 'visible',
		transform: 'translateX(0) scale(1)',
	},
	inputBar: {
		width: 'calc(100% - 40px)',
		'& .MuiInputBase-root': {
			'&:before, &:after': {
				display: 'none',
			}
		}
	},
	closeIcon: {
		width: 40
	},
	horizontalHead: {
		'& .MuiToolbar-root': {
			paddingLeft: 0,
		}
	}
});

class Header extends Component {
	constructor() {
		super()
		this.state = {
			isSearch: false,
		};
	}

	showSearchBar() {
		this.setState(prevState => ({
			isSearch: !prevState.isSearch
		}));
	}

	UNSAFE_componentWillMount() {
		this.updateDimensions();
	}

	componentDidMount() {
		const { windowWidth } = this.state;
		window.addEventListener("resize", this.updateDimensions);
	}

	updateDimensions = () => {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}

	render() {
		const { toggleSidebar, open, toggleResponsiveSidebar, openHorizontal, settings: { isDarkModeActive }, darkModeAction } = this.props;
		const { classes } = this.props;
		const { windowWidth, isSearch } = this.state;
		return (
			<div className="hk-header">
				<AppBar
					position="fixed"
					color="default"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: windowWidth < 1280 ? false : open,
						[classes.horizontalHead]: openHorizontal,
						[`rtl-header`]: !open,
					})}
				>
					<Box>
						<GlobalSearch
							showSearchBar={() => this.showSearchBar()}
							className={clsx(classes.searchBar,
								{ [classes.activeBar]: isSearch, }, 'search-bar-wrap')}
						/>
					</Box>
					<Toolbar className={classes.contentJustify}>
						<Box display="flex" alignItems="center">
							{!openHorizontal ?
								<Hidden mdDown implementation="css">
									<IconButton
										color="inherit"
										aria-label="open drawer"
										onClick={toggleSidebar}
										edge="start"
										className={clsx(classes.menuButton, {
											[classes.ToggleBtn]: open === false,
										}, 'hamburger-icon')}
									>
										<MenuIcon />
									</IconButton>
								</Hidden>
								:
								null
							}
							<Hidden lgUp implementation="css">
								<IconButton
									color="inherit"
									aria-label="open drawer"
									edge="start"
									onClick={toggleResponsiveSidebar}
									className={`${classes.menuButton} ham-menu ${classes.textLight}`}
								>
									<MenuIcon />
								</IconButton>
							</Hidden>
							{openHorizontal ?
								<div>
									<Box className="logo-wrap" mr={2} py="19px" px={4} lineHeight={0.8}>
										<Box component={Link} to="/" display="inline-block" lineHeight={0.8}>
											<img src={require('assets/Images/logo.png')} alt="site-logo" width="120" />
										</Box>
									</Box>
								</div>
								:
								null
							}
							<Box>
								<Tooltip title="Search" placement="bottom">
									<IconButton onClick={(e) => this.showSearchBar(e)} variant="contained" color="primary" style={{ padding: '6px' }}>
										<Icon className={classes.textLight} style={{ transform: 'scale(0.9)' }}>search</Icon>
									</IconButton>
								</Tooltip>
							</Box>
						</Box>
						<Box className="horizontal-icon" display="flex" alignItems="center">
							<Box className="h-btn-noti res-hide" >
								<IconButton onClick={(e) => darkModeAction(!isDarkModeActive)} variant="contained" color="primary" style={{ padding: '6px' }}>
									<Icon className={classes.textLight} style={{ transform: 'scale(0.9)' }}>{isDarkModeActive ? "light_mode" : "dark_mode"}</Icon>
								</IconButton>
							</Box>
							<Box className="h-btn-noti res-hide">
								<Notification iconColor={classes.textLight} />
							</Box>
							<Box px="10px" className="h-btn-lang">
								<LanguageProvider></LanguageProvider>
							</Box>
							<Hidden xsDown implementation="css" className="h-btn-full-scr res-hide">
								<Box>
									<FullScreen iconColor={classes.textLight} />
								</Box>
							</Hidden>
							<Box className="h-btn-user">
								<HeaderUserBlock />
							</Box>
						</Box>

					</Toolbar>
				</AppBar>
				{openHorizontal ?
					<HorizontalMenu />
					:
					null
				}
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	return { settings }
}
// 
export default withRouter(connect(mapStateToProps, { darkModeAction })(withStyles(styles)(Header)));