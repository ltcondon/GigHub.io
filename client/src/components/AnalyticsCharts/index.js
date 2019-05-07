import React, { Component } from 'react';
import './style.css';

import { Line } from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import { Col, Row } from '../Grid/Grid';
import Paper from '@material-ui/core/Paper';
import Fade from 'react-reveal/Fade';

// Options for configuration of line and bar charts from react-chartsjs2
const lineOptions = {
  elements: {
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
      position: 'bottom'
  },
  title: {
    display: true,
    text: "Keep it up! The perfect gig could be right around the corner "
  },
  plugins: {
    filler: {
        propagate: true
    }
  }
};

// Configuration for radar chart from react-chartsjs2
const radarOptions = {
    legend: {
        position: 'bottom'
    },
    title: {
      display: true,
      text: "Check out how far you've come"
    },
};

// Both charts will be displayed on a stateful component that is passed user data from our database
class AnalyticsCharts extends Component {

  state = {
      userData: []
  };

  render() {

    // Line and radar chart data occurs within the render function so they both have access to data stored in the state of the AnalyticsCharts component
    const lineData = {
      datasets: [
        {
          label: '# Applications over time',
          backgroundColor: '#FF5C62',
          borderColor: '#FF5C62',
          data: [6, 14, 8, 15]
        }
      ]
    }

    const radarData = {
      labels: ['Interested', 'Applied', 'Phone Screen', 'Code Assessment', 'On-site', 'Offer Extended', 'Not A Good Fit'],
      datasets: [
        {
          label: "Your jobs by milestone",
          fill: true,
          backgroundColor: '#FF5C62',
          borderColor: '#FF5C62',
          data: [15, 20, 10, 6, 5, 4, 8]
        }
      ]
    };

    return (
    <Fade top cascade>    
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
          <Radar 
            data={radarData} 
            options={radarOptions}
            width={100}
            height={100}
            className="radar"
          />
        </Col>
      </Row>  
    </Paper>
    </Fade>
    )
  }
};

export default AnalyticsCharts;