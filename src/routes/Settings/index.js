/**
 * Ecommerce Dashboard 
 */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Paper, Container, Box, Grid, Button, Input, Select, MenuItem } from '@material-ui/core';
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
		introductionVideo: null,
		verify_sms: "",
		invite_sms: "",
		introduction_video_file: null
	}
	componentDidMount() {
		this.getData();
	}
	getData() {
		userService.getConfig()
			.then(res => {
				if (res.success) {
					const config = res.config;
					const introductionVideo = config.find(item => item.key === "introduction").value;
					const verify_sms = config.find(item => item.key === "verify_sms").value;
					const invite_sms = config.find(item => item.key === "invite_sms").value;
					this.setState({
						introductionVideo,
						verify_sms,
						invite_sms,
					});
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
		userService.changeConfig(type === 0 ? { verify_sms } : { invite_sms })
			.then(res => {
				if (res.success === true) {
					NotificationManager.success(`Successfully updated the ${type === 0 ? "verification" : "Invite"} SMS`);
				}
			})
			.catch(err => {
				NotificationManager.error("Something went wrong");
			})
	}
	updateVideo() {
		const { introductionVideo } = this.state;
		userService.changeConfig({ introduction: introductionVideo })
			.then(res => {
				if (res.success === true) {
					NotificationManager.success(`Successfully ${strisnull(introductionVideo) ? "deleted" : "updated"} the introduction video`);
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
					this.setState({
						introduction_video_file: null,
						introductionVideo: res.path
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
					this.setState({
						introductionVideo: null,
					}, () => {
						this.updateVideo();
					})
				} else {
				}
			});
	}
	render() {
		const { classes } = this.props;
		const { introductionVideo, verify_sms, invite_sms, introduction_video_file } = this.state;
		return (
			<div className="new-dashboard">
				<Container maxWidth="lg">
					<Box pt={3}>
						<Paper className={classes.Paper} square >
							<Grid container spacing={3} >
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"Introduction video"} showDivider={true}><br />
										{strisnull(introductionVideo) ?
											"Not showing introduction video page on app"
											:
											<Player>
												<source src={getLink(introductionVideo)} />
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
										{!strisnull(introductionVideo) &&
											<Button variant="contained" color="secondary" component="span" style={{ marginLeft: 20 }} onClick={this.removeIntroVideo.bind(this)}> Delete </Button>
										}
									</CustomCard>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
									<CustomCard title={"SMS to verification"} showDivider={true}>
										<Input rows={8} multiline fullWidth value={verify_sms} onChange={(text) => this.setState({ verify_sms: text.target.value })} /><p style={{ textAlign: "right", color: "red" }}>{'*{code}'}</p>
										<Button variant="contained" color="primary" component="span" onClick={() => this.saveSMS(0)}> Save</Button>
									</CustomCard>
								</Grid>
								<Grid item xs={12} sm={6} md={4}>
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
										<Input rows={8} multiline fullWidth value={invite_sms} onChange={(text) => this.setState({ invite_sms: text.target.value })} /><p></p>
										<Button variant="contained" color="primary" component="span" onClick={() => this.saveSMS(1)}> Save</Button>
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