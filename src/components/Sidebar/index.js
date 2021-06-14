import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import SidebarContent from './Components/SidebarContent';


const drawerWidth = 260;

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: '#272e3d',
		borderRight: '0',
		overflowY: 'hidden'
	},
	drawerHeader: {
		display: 'flex',
		borderBottom: '1px solid #404854',
		alignItems: 'center',
		padding: theme.spacing(0, 2),
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
	},
	dFlex: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	smallBtn: {
		padding: '2px 5px',
		fontSize: '0.8rem',
	}
}));

export default function Sidebar(props) {
	const classes = useStyles();
	const { closeSidebar } = props;

	return (
		<div>
			<div className="sidebar-wrap h-100">
				<div className={classes.drawerHeader}>
						<Box className="site-logo" display="inline-flex" alignItems="center">
							<Box component={Link} to="/" className="logo-mini" lineHeight={0.8} style={{ marginTop:10 }}>
								<img src={require('assets/Images/logo.png')} alt="site-logo" width="140" />
							</Box>
						</Box>
					</div>
				<Scrollbars
					className="hulk-scroll"
					autoHide
					autoHideDuration={100}
					style={{ height: '100vh' }}
				>
					<SidebarContent closeSidebar={closeSidebar}></SidebarContent>
				</Scrollbars>
			</div>
		</div>
	);
}