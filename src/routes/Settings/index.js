/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Paper, Container, Box, Grid, Button, Input, Select, MenuItem, TextField } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { CustomCard } from 'components/GlobalComponents';
import { userService } from "../../_services";
import { NotificationManager } from 'react-notifications';
import { getLink, strisnull } from 'helpers'
import swal from 'sweetalert';

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
		config: {

		},
		introduction_video_file: null
	}
	componentDidMount() {
		this.getData();
	}
	getData() {
		userService.getConfig()
			.then(res => {
				if (res.success) {
					let config = {};
					res.config.forEach(item => {
						config[item.key] = item.value;
					});
					this.setState({ config });
				}
			})
			.catch(err => {
				console.log(err);
			})
	}
	uploadVideo(e) {
		this.setState({ introduction_video_file: e.target.files[0] });
	}
	saveSMS(type) {
		let { verify_sms, invite_sms } = this.state;
		if (type === 0 && !verify_sms?.includes("{code}"))
			return NotificationManager.error("Verification SMS text must be contains '{code}'");
		this.updateConfig(type === 0 ? { verify_sms } : { invite_sms });
	}
	updateConfig(data) {
		userService.changeConfig(data)
			.then(res => {
				if (res.success === true) {
					NotificationManager.success(`Successfully updated config`);
				}
			})
			.catch(err => {
				NotificationManager.error("Something went wrong");
			})
	}
	updateVideo() {
		const { config } = this.state;
		userService.changeConfig({ introduction: config.introduction })
			.then(res => {
				if (res.success === true) {
					NotificationManager.success(`Successfully ${strisnull(config.introduction) ? "deleted" : "updated"} the introduction video`);
					this.getData();
				}
			})
			.catch(err => {
				NotificationManager.error("Something went wrong");
			})
	}
	change_video() {
		const { introduction_video_file } = this.state;
		if (!introduction_video_file) {
			document.getElementById("introduction_video").click();
		} else {
			userService.uploadFile(introduction_video_file)
				.then(res => {
					res = res.data;
					this.setState({ introduction_video_file: null, });
					this.configState({
						introduction: res.path
					}, () => {
						this.updateVideo();
					});
				})
				.catch(err => {
					NotificationManager.error("Something went wrong");
				})
		}
	}
	removeIntroVideo() {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this introduction video!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					this.configState({
						introduction: null,
					}, () => {
						this.updateVideo();
					})
				} else {
				}
			});
	}
	handleChange(key, event) {
		this.configState({ [key]: event.target.value });
	};
	updateOtherSetting() {
		let config = this.state.config;
		delete config.introduction;
		delete config.verify_sms;
		delete config.invite_sms;
		this.updateConfig(config);
	}
	configState(item, callback) {
		this.setState({
			config: {
				...this.state.config,
				...item
			}
		}, callback)
	};
	render() {
		const { classes } = this.props;
		const { config: { introduction, verify_sms, invite_sms, terms_url, android_link, ios_link, google_map_api_key, tenor_key, admin_contacts, app_version, app_update_date }, introduction_video_file } = this.state;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<Paper className={classes.Paper} square >
							<Grid container spacing={3} >
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"Introduction video"} showDivider={true}><br />
										{strisnull(introduction) ?
											"Not showing introduction video page on app"
											:
											<Player>
												<source src={getLink(introduction)} />
											</Player>
										}
										<br />
										<input
											accept="video/*"
											className={classes.input}
											type="file"
											id="introduction_video"
											hidden
											onChange={(e) => this.uploadVideo(e)}
										/>
										<Button variant="contained" color="primary" component="span" onClick={this.change_video.bind(this)}> {introduction_video_file ? `Upload file (${introduction_video_file.name})` : "Choose Video"} </Button>
										{!strisnull(introduction) &&
											<Button variant="contained" color="secondary" component="span" style={{ marginLeft: 20 }} onClick={this.removeIntroVideo.bind(this)}> Delete </Button>
										}
									</CustomCard>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"SMS to verification"} showDivider={true}>
										<Input
											rows={5}
											multiline
											fullWidth
											value={verify_sms}
											onChange={this.handleChange.bind(this, "verify_sms")}
										/>
										<p style={{ textAlign: "right", color: "red" }}>{'*{code}'}</p>
										<Button variant="contained" color="primary" component="span" onClick={() => this.saveSMS(0)}> Save</Button>
									</CustomCard>
									<br />
									<CustomCard title={"SMS to Invite user"} showDivider={true}>
										<Select
											style={{ width: "100%", marginTop: 4, marginBottom: 3 }}
											value={0}
											onChange={(event) => this.setState({ invite_sms: `${invite_sms}\n${event.target.value}` })}
											displayEmpty
										>
											<MenuItem value={0}><em>Add Variables</em></MenuItem>
											<MenuItem value={"{app link}"}>App Link</MenuItem>
											<MenuItem value={"{sender name}"}>Sender Name</MenuItem>
											<MenuItem value={"{sender phone}"}>Sender Phone</MenuItem>
										</Select>
										<Input
											rows={8}
											multiline
											fullWidth
											value={invite_sms}
											onChange={this.handleChange.bind(this, "invite_sms")}
										/>
										<p style={{ textAlign: "right", color: "red" }}>{'*{sender name}, *{sender phone}, *{app link}'}</p>
										<Button variant="contained" color="primary" component="span" onClick={() => this.saveSMS(1)}> Save</Button>
									</CustomCard>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"Other settings"} showDivider={true} >

										<TextField
											label="App version"
											fullWidth
											margin="normal"
											value={app_version}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "app_version")}
										/>
										<TextField
											label="App updated date"
											fullWidth
											margin="normal"
											value={app_update_date}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "app_update_date")}
										/>

										<TextField
											label="Contacts info"
											fullWidth
											margin="normal"
											value={admin_contacts}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "admin_contacts")}
										/>
										<TextField
											label="Terms and confitions"
											fullWidth
											margin="normal"
											value={terms_url}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "terms_url")}
										/>


										<TextField
											label="Android app link"
											fullWidth
											margin="normal"
											value={android_link}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "android_link")}
										/>


										<TextField
											label="iOS app link"
											fullWidth
											margin="normal"
											value={ios_link}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "ios_link")}
										/>


										<TextField
											label="Google map api key"
											fullWidth
											margin="normal"
											value={google_map_api_key}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "google_map_api_key")}
										/>


										<TextField
											label="Tenor api key (Gif images)"
											fullWidth
											margin="normal"
											value={tenor_key}
											InputLabelProps={{ shrink: true, }}
											onChange={this.handleChange.bind(this, "tenor_key")}
										/>

										<Button variant="contained" color="primary" component="span" onClick={this.updateOtherSetting.bind(this)}> Save</Button>
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