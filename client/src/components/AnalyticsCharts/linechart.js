import React, {Component} from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import "./style.css";
import API from '../../utils/API';

class LineChart extends Component {

    state = {
    
    }

  componentDidMount() {
    this.setState({...this.props.state});
    const { datasets } = this.refs.chart.chartInstance.data
    console.log(datasets[0].data);
    this.getDataPoints();

    }


  getDataPoints  = () => {
    const days = [];
    const week = [];
    const currentDate = moment();
    console.log(`Current Date: ${currentDate}`);
    // should be in format of 2019-07-17T21:13:07.056Z

    const weekStart = moment().startOf('day').subtract(6, "days")
      console.log(weekStart);

 
    for (let i = 0; i <= 6; i++) {
 
        week.push(moment(weekStart).add(i, 'days').format("MMM Do"));
        console.log(`State ID: ${this.props.state.id}`)

        API.getJobsByDate(this.props.state.id, {$gte: currentDate.startOf('day').subtract(6-i, 'days'), $lte: currentDate.startOf('day').subtract(6-(i+1), 'days')})
            .then(res => {
                console.log(res);
                days[i] = res.data.length;
            })

    };


    console.log("Days:");
    console.log(days);
    console.log("Week:");
    console.log(week);
    

    console.log(moment('01/19/2016').format("dddd, MMYY"));

    this.setState({
        week: week,
        days: days
    });
  }

//   getLabels  = () => {
//     const week = [];

//     const weekStart = moment().subtract(6, "days")
//     console.log(weekStart);

 
//     for (let i = 0; i <= 6; i++) {
//         week.push(moment(weekStart).add(i, 'days').format("MMM Do"));
//     }

//     return week;
// }

//   getJobsByDate = () => {
//     const day1 = moment().startOf('day');

//     const day1ct = 0;
//     const day2ct = 0;
//     const day3ct = 0;
//     const day4ct = 0;
//     const day5ct = 0;
//     const day6ct = 0;
//     const day7ct = 0;


//     API.getJobsByDate(day1)
//         .then(res => {
//             day1ct = res.data.length;
//         });
//     API.getJobsByDate(moment(day1).add(1, "days"))
//             .then(res => {
//             day1ct = res.data.length;
//         });
//     API.getJobsByDate(moment(day1).add(2, "days"))
//             .then(res => {
//             day1ct = res.data.length;
//         });
//     API.getJobsByDate(moment(day1).add(3, "days"))
//             .then(res => {
//             day1ct = res.data.length;
//         });
//     API.getJobsByDate(moment(day1).add(4, "days"))
//             .then(res => {
//             day1ct = res.data.length;
//         });
//     API.getJobsByDate(moment(day1).add(5, "days"))
//             .then(res => {
//             day1ct = res.data.length;
//         });
//     API.getJobsByDate(moment(day1).add(6, "days"))
//             .then(res => {
//             day1ct = res.data.length;
//         });

//         this.setState
//     }

  render() {
    const data = {
        labels: this.state.week,
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
          },
          {
            label: 'LinkedIn Average',
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgb(90, 159, 238, 0.637)',
            borderColor: 'rgb(90, 159, 238)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgb(90, 159, 238)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(90, 159, 238)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2]
          }
        ]
      };

      const lineOptions = {
        legend: {
          display: true,
          position: 'bottom'
        },
        title: {
          display: true,
          text: "Your Activity Last Week"
        },
    };
      
    return (
      <div className="container mainbox">
        <h2 className="boxTitle">Recent Activity</h2>
        <Line ref="chart" data={data} options={lineOptions}/>
        <div className="source"><a className="source" href="https://expandedramblings.com/index.php/linkedin-job-statistics/">Source</a></div>
      </div>
    );
  }
}
export default LineChart;

