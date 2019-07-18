import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import "./style.css";

const getDataPoints  = () => {
    const days = [];

    const weekStart = moment().subtract(6, "days")
    console.log(weekStart);

 
    for (let i = 0; i <= 6; i++) {
 
        days.push(moment(weekStart).add(i, 'days').format("MMM Do")); 
    };


    console.log(days);

    console.log(moment('01/19/2016').format("dddd, MMYY"));

    return days;
}

const data = {
  labels: getDataPoints(),
  datasets: [
    {
      label: 'Applications Submitted',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(255, 92, 97, 0.637)',
      borderColor: '#FF5C62',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#FF5C62',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FF5C62',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [6, 9, 0, 1, 5, 5, 4]
    }
  ]
};

export default class LineChart extends Component {

  render() {
      
    return (
      <div className="container mainbox">
        <h2>Recent Activity</h2>
        <Line ref="chart" data={data} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}