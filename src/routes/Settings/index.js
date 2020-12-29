/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Paper, Container, Box, Grid, Button, Input, Icon } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { CustomCard, HulkPageLoader } from 'components/GlobalComponents';
import { userService } from "../../_services";

const styles = theme => ({
	Paper: {
		padding: '0.75rem',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		'&:first-child': {
			paddingTop: '24px',
		},
		'&:last-child': {
			paddingBottom: '30px',
		}
	},
});

class Settings extends Component {
	state = {
		introductionVideo: null,
		verify_sms: null
	}
	componentDidMount() {
		this.getData();
	}
	getData() {
		userService.getConfig()
			.then(res => {
				if (res.success) {
					const config = res.config;
					const introductionVideo = config.find(item => item.key == "introduction").value;
					const verify_sms = config.find(item => item.key == "verify_sms").value;
					this.setState({
						introductionVideo,
						verify_sms
					});
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
	render() {
		const { classes } = this.props;
		const { introductionVideo, verify_sms } = this.state;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<Paper className={classes.Paper} square >
							<Grid container spacing={3} >
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"Introduction video"} showDivider={true}><br />
										{introductionVideo ?
											<Player>
												<source src={introductionVideo} />
											</Player>
											:
											"Not showing introduction video page on app"
										}
										<br />
										<input
											accept="video/*"
											className={classes.input}
											id="contained-button-file"
											type="file"
											hidden
										/>
										<label htmlFor="contained-button-file">
											<Button variant="contained" color="primary" component="span"> Upload Video </Button>
										</label>
										{introductionVideo &&
											<Button variant="contained" color="secondary" component="span" style={{ marginLeft: 20 }}>
												<Icon>trash</Icon>
											Delete </Button>
										}
									</CustomCard>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"SMS to verification"} showDivider={true}>
										<Input rows={5} multiline fullWidth value={verify_sms} />{'*{code}'}<br /><br />
										<Button variant="contained" color="primary" component="span"> Save</Button>
									</CustomCard>
								</Grid>
							</Grid>
						</Paper>
					</Box>
				</Container>
			</div>
		);
	}
}

export default withStyles(styles)(withTheme(Settings));