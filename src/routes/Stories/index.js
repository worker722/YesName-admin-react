/**
 * Contacts tab section
*/
import { Box, Container, FormControl, Input, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { SmallTitleBar } from 'components/GlobalComponents';
import React, { useRef, useState } from 'react';
import IntlMessages from 'util/IntlMessages';
import ConfirmationDialog from './Components/ConfirmationDialog';
import ContactGridItem from './Components/ContactGridItem';
import { contactsData } from "../../assets/Data/Contacts"

const useStyles = makeStyles(theme => ({
	tabsWrap: {
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
	},
	appWrap: {
		boxShadow: "none",
	},
	toolbar: {
		padding: '0',
		marginLeft: -12,
		marginRight: -12,
		'& button': {
			minHeight: 50,
		},
		'& .MuiTab-wrapper': {
			fontSize: '1rem',
		},
		'& .Mui-selected': {
			backgroundColor: `rgba(0,0,0,0.1)`,
		}
	},
	searchBarWrap: {
		'& .MuiInput-underline::before': {
			borderBottom: `1px solid ${theme.palette.common.white}`,
		},
		'& .MuiInputBase-input::placeholder': {
			color: theme.palette.common.white,
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
			borderColor: theme.palette.common.white,
		},
		'& .MuiInput-underline::after': {
			borderBottom: `1px solid ${theme.palette.common.white}`,
		},
		'& .MuiInputBase-root': {
			width: 360,
			'& input': {
				color: theme.palette.common.white,
			},
			[theme.breakpoints.down('xs')]: {
				width: '100%',
				marginBottom: 20,
			},
		},
		'& .MuiSvgIcon-root': {
			fill: theme.palette.common.white,
		}
	}
}));

function ContactGrid() {
	const classes = useStyles();
	const [message, setMessage] = useState('');
	const [data, setData] = useState(null);
	const confirmation = useRef(null);

	const ondeleteContact = (data) => {
		setData(data);
		confirmation.current.openDialog();
	}

	const deleteContactPermanent = (popupResponse) => {
		if (popupResponse) {
			setData('');
		}
	}

	const handleClickEdit = (data) => {
		console.log("edit", data);
	}

	return (
		<div className="contact-grid">
			<SmallTitleBar title={<IntlMessages id="component.stories" />} />
			<Box className={`title-contact-block ${classes.searchBarWrap}`} pt={0} bgcolor="background.paper" px={{ xs: '12px', md: 0 }} pb={3} >
				<Container>
					<Box textAlign={{ xs: 'center', sm: 'right' }} display={{ xs: 'block', sm: 'flex' }} alignItems="center" justifyContent="space-between">
						<Box />
						<Box>
							<FormControl fullWidth >
								<Input
									type="text"
									name="search"
									placeholder="Search User"
									onChange={(event) => setMessage(event.target.value)}
									value={message}
									endAdornment={
										<InputAdornment position="end">
											<SearchIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
						</Box>
					</Box>
				</Container>
			</Box>
			<Container>
				<Box textAlign={{ xs: 'center', sm: 'right' }} display={{ xs: 'block', sm: 'flex' }} alignItems="center" justifyContent="space-between" marginTop={3}>
					<div className="contact-tab-wrap Tab-wrap">
						<div className="contact-grid-wrap">
							<ContactGridItem
								parentEditMethod={(e) => handleClickEdit(e)}
								parentMethod={(e) => ondeleteContact(e)}
								contacts={contactsData}
							/>
						</div>
						<ConfirmationDialog
							ref={confirmation}
							onConfirm={(res) => deleteContactPermanent(res)}
						/>
					</div>
				</Box>
			</Container>
		</div>
	);
}

export default ContactGrid;