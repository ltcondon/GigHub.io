import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import API from '../../utils/API'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  data: {
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class UserOverview extends React.Component {
  // const activeApps;
  // const responseRate;
  // const interviewRate;

  state = {
    activeJobs: [],
    responseRate: '',
    interviewRate:''
  }

  componentDidMount () {
    this.setState({...this.props.state});
    this.getUserInfo();
  };

  getUserInfo = () => {
    API.getUserJobs(this.state.id)
        .then(res => {
          let responses = 0;
          let responseRate = 0;

          res.data.map(userJob => {
            
            if (userJob.status === "In Progress" && userJob.milestone !== "Applied") {
              responses++;
              responseRate = (responses / res.data.length)
              console.log("Responses: " + responses);
              console.log("Response rate: " + responseRate);
            }
            return responseRate;

        })

          this.setState({
            activeJobs : res.data,
            responseRate : responseRate
          });

        });   
  };

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h4>Active Jobs</h4>
              <h2>{this.state.activeJobs.length}</h2>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h4>Response Rate</h4>
              <h2>{this.state.responseRate}</h2>
            </Paper>
          </Grid> 
          <Grid item xs>
            <Paper className={classes.paper}>
              <h4>Interview Rate</h4>
              {/* <h2>{interviewRate}</h2> */}
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={8}>
        
        </Grid>
      </div>
    );
  }
}

UserOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserOverview);