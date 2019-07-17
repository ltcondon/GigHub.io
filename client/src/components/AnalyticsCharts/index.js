import React, { Component } from 'react';
import './style.css';
import API from '../../utils/API';


import { Line } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Col, Row } from '../Grid/Grid';
import Paper from '@material-ui/core/Paper';
import Fade from 'react-reveal/Fade';

// Options for configuration of line and bar charts from react-chartsjs2
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'bottom'
  },
  title: {
    display: true,
    text: "Keep it up! That perfect gig could be right around the corner"
  },
  plugins: {
    filler: {
      propagate: true
    }
  }
};

// Configuration for radar chart from react-chartsjs2
const doughnutOptions = {
    legend: {
        position: 'bottom'
    },
    title: {
      display: true,
      text: "See where you're at in the process"
    },
};

// Both charts will be displayed on a stateful component that is passed user data from our database
class AnalyticsCharts extends Component {

  state = {
      userData: [],
      numInterested: [],
      numApplied: [],
      numPhoneScreen: [],
      numCodeAssessment: [],
      numOnSite: [],
      numOffers: [],
      numDeclined: []
  };

  // Grab state passed down from contact route from dashboard
  componentDidMount () {
    this.setState({...this.props.state});
    this.getUserData();
  };

  // Grab user contacts from db when component updates if userID has been passed down to this components' state
  componentDidUpdate (prevProps) {
    if (this.props.state.id !== prevProps.state.id) {
      this.setState({...this.props.state});
      this.getUserData();
    }
  };

  getUserData = () => {
    const jobData = [];

    const numInterested =  [];
    const numApplied =  [];
    const numPhoneScreen =  [];
    const numCodeAssessment =  [];
    const numOnSite =  [];
    const numOffers =  [];
    const numDeclined =  [];

    API.getUserJobs(this.props.state.id)
        .then(res => {

          for (let i=0; i < res.data.length; i++) {
            jobData.push(res.data[i]);

            switch(res.data[i].milestone) {
              case("Interested"):
              numInterested.push(res.data[i]);
              break;
              case("Applied"):
              numApplied.push(res.data[i]);
              break;
              case("Phone Screen"):
              numPhoneScreen.push(res.data[i]);
              break;
              case("Code Assessment"):
              numCodeAssessment.push(res.data[i]);
              break;
              case("On-Site"):
              numOnSite.push(res.data[i]);
              break;
              case("Offer Extended"):
              numOffers.push(res.data[i]);
              break;
              default:
              numDeclined.push(res.data[i]);
              break;
          }

          this.setState({
            userData: jobData,
            numInterested: numInterested,
            numApplied: numApplied,
            numPhoneScreen: numPhoneScreen,
            numCodeAssessment: numCodeAssessment,
            numOnSite: numOnSite,
            numOffers: numOffers,
            numDeclined: numDeclined
          });
        }
      });
    }
        
  render() {

    // Line and radar chart data occurs within the render function so they both have access to data stored in the state of the AnalyticsCharts component
    const lineData = {
      labels: ['', '', '', '', '', ''],
      datasets: [
        {
          label: 'Activity by Week',
          backgroundColor: '#FF5C62',
          borderColor: '#292930',
          data: [0, 6, 16, 8, 9, 15]
        }
      ]
    }

    const doughnutData = {
      labels: ['Interested', 'Applied', 'Phone Screen', 'Code Assessment', 'On-site', 'Offer Extended', 'Not A Good Fit'],
      
      datasets: [
        {
          label: "Active Jobs (by milestone)",
          fill: true,
          backgroundColor: ['#FF5C62', '#FB8122', '#FCC133', '#7F3AE8', '#36A2EB', '#11AF23', '#292930' ],
          data: [
            this.state.numInterested.length,
            this.state.numApplied.length,
            this.state.numPhoneScreen.length,
            this.state.numCodeAssessment.length,
            this.state.numOnSite.length,
            this.state.numOffers.length,
            this.state.numDeclined.length
          ]
        }
      ]
    };

    return (
    <Fade bottom cascade duration={500}>    
    <Paper className="chart-wrapper">
      <Row>
        <Col size="sm-8 line-chart">
          <Line 
            data={lineData} 
            options={lineOptions}
            width={100}
            height={100}
            className="line"
          />
        </Col>
        <Col size="sm-4 radar-chart">
          <Doughnut 
            data={doughnutData} 
            options={doughnutOptions}
            width={100}
            height={100}
            className="doughnut"
          />
        </Col>
      </Row>  
    </Paper>
    </Fade>
    )
  }
};

export default AnalyticsCharts;