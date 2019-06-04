import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AnalyticsCharts from '../AnalyticsCharts/index';

import API from '../../utils/API'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: '20px',
    textAlign: 'center',
    background: '#F7F4E9',
    border: '2px',
    margin: '5%',
    borderColor: '#FF5C62',
    boxShadow: '0px 2px 5px 2px #FF5C62'
  },
  title: {
    color: '#FF5C62',
    fontWeight: 'bold',
    fontSize: '54px',
  },
  data: {
    padding: '20px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class UserOverview extends React.Component {
  
  state = {
    interviewRate:''
  }

  componentDidMount () {
    this.setState({...this.props.state});
    this.getUserInfo();
  };

  componentDidUpdate (prevProps) {
    if (this.props.state.id !== prevProps.state.id) {
      this.setState({...this.props.state});
      this.getUserInfo();
    }
  }

  getUserInfo = () => {
    API.getUserJobs(this.props.state.id)
        .then(res => {
          let responses = 0;
          let responseRate = 0;
          let interviews = 0;
          let interviewRate = 0;

          res.data.map(userJob => {
            
            if (userJob.status === "In Progress" && userJob.milestone !== "Applied") {

              if (userJob.milestone !== "Interested" && userJob.milestone !== "Not A Good Fit") {
                interviews++
              }

              responses++;
              responseRate = (responses / res.data.length) * 100
              interviewRate = (interviews / responses) * 100

              console.log(
              "Interviews: " + interviews + '\n' +
              "Responses: " + responses + '\n')
            }
            return responseRate;

        })
          console.log(res.data.length)
          console.log(this.state.id)
          this.setState({
            activeJobs : res.data,
            responseRate: responseRate.toFixed(1),
            interviewRate: interviewRate.toFixed(1)
          });

        });   
  };

  render() {

    const { classes } = this.props;
 
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h4>Active Jobs</h4>
              { this.state && this.state.activeJobs &&
                <h2 className={classes.title}>{this.state.activeJobs.length}</h2>}
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
              <h4>Response Rate</h4>
              <h2 className={classes.title}>{this.state.responseRate}%</h2>
            </Paper>
          </Grid> 
          <Grid item xs>
            <Paper className={classes.paper}>
              <h4>Interview Rate</h4>
              <h2 className={classes.title}>{this.state.interviewRate}%</h2>
            </Paper>
          </Grid>
        </Grid>

        {/* <Grid container> */}
            <AnalyticsCharts state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
          {/* </Grid> */}
      </div>
    );
  }
}

UserOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserOverview);