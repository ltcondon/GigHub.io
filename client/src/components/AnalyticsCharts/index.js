import React, { Component } from 'react';
import './style.css';

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
      userData: []
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
    API.getActiveJobs(this.props.state.id)
        .then(res => {

          const jobData = [];
          for (let i=0; i < res.data.length; i++) {
            jobData.push(res.data[i]);
          };

          this.setState({ userData: jobData});
        }); 
  };

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
          data: [15, 20, 10, 6, 5, 4, 8]
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