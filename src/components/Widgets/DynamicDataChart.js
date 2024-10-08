/**
 * Dynamic Data Widget
 */
import { Box, Button, Grid, LinearProgress, List, ListItem, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
// Component
import { CustomCard } from 'components/GlobalComponents';
import DynamicLineEchart from 'components/GlobalComponents/Charts/DynamicLineEchart';
import React, { Component } from 'react';
import IntlMessages from 'util/IntlMessages';



const styles = theme => ({
	listItems: {
		padding: '10px 11px',
	},
	primaryProgress: {
		color: theme.palette.primary.main,
	},
	secondaryProgress: {
		color: theme.palette.secondary.main,
	},
	infoProgress: {
		color: theme.palette.info.main,
	},
	successProgress: {
		color: theme.palette.success.main,
	},
	btnWrap: {
		'& .btn': {
			marginRight: 20,
		},
		'@media (max-width:374px)': {
			textAlign: 'center',
			'& button, & .btn': {
				display: 'block',
				marginRight: 'auto',
				marginLeft: 'auto',
			},
			'& .btn': {
				marginBottom: 20,
			}
		},
	}
});

class DynamicDataChart extends Component {
	state = {
		stats: this.props.stats,
		progressData: this.props.progressData,
	}

	render() {
		const { classes, progressData, stats } = this.props;
		return (
			<div className="dynamic-chart-wrap">
				<Grid container spacing={3} className="welcome-stat">
					{
						stats.map((data, i) => (
							<Grid item xs={12} sm={12} md={3} key={i}>
								<CustomCard>
									<Box display="flex" justifyContent="space-between" alignItems="center">
										<Box display="flex" alignItems="center">
											<Box mr={1} className="icon-wrap">
												<i className={`material-icons ${data.iconColor} font-ls`}> {data.icon} </i>
											</Box>
											<Box className="font-weight-med"><IntlMessages id={data.title} /></Box>
										</Box>
										<Box>
											<Typography variant="h4" className="mb-0">{data.count}</Typography>
										</Box>
									</Box>
								</CustomCard>
							</Grid>
						))
					}

				</Grid>
				<Grid container spacing={3} >
					<Grid item xs={12} sm={12} md={12}>
						<CustomCard title={"widgets.title"} showDivider={true}>
							<Grid container spacing={3} >
								<Grid item xs={12} sm={12} md={7}>
									<DynamicLineEchart height={'400px'} />
								</Grid>
								<Grid item xs={12} sm={12} md={5}>
									<div>
										<Box mb="4px" className={classes.listWrap}>
											{progressData && progressData.length > 0 &&
												<List component="nav" aria-label="secondary mailbox folders">
													{progressData && progressData.map((progressData, index) => (
														<ListItem key={index} component="li" ripple='false' className={classes.listItems}>
															<Box display="block" width="100%">
																<Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
																	<Typography variant="body2" color="textPrimary">
																		<IntlMessages id={progressData.title} />
																	</Typography>
																	<Box color="primary.main" fontSize="body2.fontSize" textAlign="right">
																		{progressData.progress}
																	</Box>
																</Box>
																<LinearProgress variant="determinate" value={progressData.value} style={{ height: '12px' }} />
															</Box>
														</ListItem>
													))}
												</List>
											}
										</Box>
										<Box p="12px" mb="20px">
											<Grid container spacing={3} >
												{/* <Grid item xs={12} sm={6} md={6}>
													<Card>
														<Box px={2} py={3} textAlign="center">
															<Box position="relative" display="inline-block">
																<CircularProgress color="primary" thickness={4} size={100} variant="determinate" value={79} />
																<Box position="absolute" top={41} left={'38px'} fontSize="subtitle2.fontSize" fontWeight="500">79%</Box>
															</Box>
															<Box pt={1} display="flex" justifyContent="center" alignItems="center">
																<Box fontWeight="500" fontSize="subtitle1.fontSize">
																	<IntlMessages id={"Server Load"} />
																</Box>
																<Box color="success.main" pl={1} className="server-icon fas fa-caret-up"></Box>
															</Box>
														</Box>
													</Card>
												</Grid>
												<Grid item xs={12} sm={6} md={6}>
													<Card>
														<Box px={2} py={3} textAlign="center">
															<Box position="relative" display="inline-block">
																<CircularProgress color="secondary" thickness={4} size={100} variant="determinate" value={79} />
																<Box fontWeight="500" position="absolute" top={41} left={'38px'} fontSize="subtitle2.fontSize">79%</Box>
															</Box>
															<Box pt={1} display="flex" justifyContent="center" alignItems="center">
																<Box fontWeight="500" fontSize="subtitle1.fontSize">
																	<IntlMessages id={"Server Load"} />
																</Box>
																<Box color="success.main" pl={1} className="server-icon fas fa-caret-up"></Box>
															</Box>
														</Box>
													</Card>
												</Grid> */}
											</Grid>
										</Box>
										<Box mb={2} className="btn-group { classes.btnWrap}" textAlign="center">
											<Button variant="outlined" className="primary-bg-btn" color="primary"  size="large" onClick={this.props.clearStorage}>Clean storage</Button>
											{/* <Button variant="outlined" className="primary-bg-btn" color="primary"  size="large" >Generate PDF</Button> */}
											{/* <Button variant="outlined" className="primary-bg-btn" color="primary" size="large">Report Bug</Button> */}
										</Box>
									</div>
								</Grid>
							</Grid>
						</CustomCard>
					</Grid>
				</Grid>
			</div >
		);
	}
}

export default withStyles(styles)(DynamicDataChart);