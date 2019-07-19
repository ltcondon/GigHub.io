import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fade from 'react-reveal/Fade';
import "./style.css";
import Tooltip from '@material-ui/core/Tooltip';



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
    minHeight: '121.6px',
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

class UserOverview extends React.PureComponent {
  
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

  getActiveJobs = () => {
    API.getActiveUserJobs(this.props.state.id)
      .then(res =>this.setState({activeJobs : res.data}))
  }

  getUserInfo = () => {

    API.getUserJobs(this.props.state.id)
        .then(response => {
          let totalJobs = response.data;
          let responses = 0;
          let responseRate = 0;
          let interviews = 0;
          let interviewRate = 0;

          API.getActiveUserJobs(this.props.state.id)
          .then(res => {
            
              totalJobs.map(userJob => {
                console.log(`Created at: ${userJob.createdAt}`)
                if (userJob.milestone !== "Applied") {
    
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
                return this.setState({
                  activeJobs : res.data,
                  totalJobs : totalJobs,
                  responseRate: responseRate.toFixed(1),
                  interviewRate: interviewRate.toFixed(1)
                });
              });
            });
          });
        };

          

        //   totalJobs.map(userJob => {
            
        //     if (userJob.milestone !== "Applied") {

        //       if (userJob.milestone !== "Interested" && userJob.milestone !== "Not A Good Fit") {
        //         interviews++
        //       }

        //       responses++;
        //       responseRate = (responses / res.data.length) * 100
        //       interviewRate = (interviews / responses) * 100

        //       console.log(
        //       "Interviews: " + interviews + '\n' +
        //       "Responses: " + responses + '\n')
        //     }
        //     return responseRate;

        // })
        //   console.log(res.data.length)
        //   console.log(this.state.id)
        //   console.log("Total Jobs: " + res.data.length)
        //   this.setState({
        //     totalJobs : res.data,
        //     responseRate: responseRate.toFixed(1),
        //     interviewRate: interviewRate.toFixed(1)
        //   });

        // });   
  // };

  render() {

    const { classes } = this.props;
 
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item xs>
          <Fade left duration={500}>
          <Tooltip title="Total 'Jobs' added in 'MyJobs' (includes deleted jobs)">
            <Paper className={classes.paper} id="total">
              <h4>Total Jobs</h4>
              { this.state && this.state.totalJobs &&
                <h2 id="totalJobs" className={classes.title}>{this.state.totalJobs.length}</h2>}
            </Paper>
          </Tooltip>
          </Fade>
          </Grid>

          <Grid item xs>
          <Fade left duration={500}>
          <Tooltip title="Total 'Jobs' with status of 'Applied' or higher (excludes deleted jobs)">
            <Paper className={classes.paper}>
              <h4>Active Jobs</h4>
              { this.state && this.state.activeJobs &&
                <h2 className={classes.title}>{this.state.activeJobs.length}</h2>}
            </Paper>
          </Tooltip>
          </Fade>
          </Grid>

          <Grid item xs>
            <Fade top duration={500}>  
            <Tooltip title="Total Jobs with status of 'Phone Screen' or higher / Total Jobs (includes 'Not A Good Fit')">
            <Paper className={classes.paper}>
              <h4>Response Rate</h4>
              <h2 className={classes.title}>{this.state.responseRate}%</h2>
            </Paper>
            </Tooltip>
            </Fade>

          </Grid> 
          <Grid item xs>
            <Fade right duration={500}>  
            <Tooltip title="Total Jobs with status of 'Phone Screen' or higher / Total Jobs (excludes 'Not A Good Fit')">
            <Paper className={classes.paper}>
              <h4>Interview Rate</h4>
              <h2 className={classes.title}>{this.state.interviewRate}%</h2>
            </Paper>
            </Tooltip>
            </Fade>
          </Grid>
        </Grid>

        <div style={{padding: '20px'}}>
          <AnalyticsCharts state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
        </div>
      
      </div>
    );
  }
}

UserOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserOverview);