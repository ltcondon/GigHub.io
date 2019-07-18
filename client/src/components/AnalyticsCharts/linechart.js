import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';


const getDataPoints  = () => {
    const days = [];

    const weekStart = moment().subtract(6, "days")
    console.log(weekStart);

 
    for (let i = 0; i <= 6; i++) {
 
        days.push(moment(weekStart).add(i, 'days').format("dddd, MMM Do")); 
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
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class LineChart extends Component {

  render() {
      
    return (
      <div>
        <h2>Line Example</h2>
        <Line ref="chart" data={data} />
      </div>
    );
  }

  componentDidMount() {
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
  }
}