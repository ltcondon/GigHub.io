import React, { Component } from 'react';
import './style.css';
import { Bar } from 'react-chartjs-2';

import { Col, Row } from '../Grid/Grid';

// Options for configuration of chart from react-chartsjs2
const options = {
  elements: {
    rectangle: {
      borderWidth: 2,
      borderColor: '#FF5C62',
      borderSkipped: 'bottom'
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    position: 'top'
  },
  title: {
    display: true,
    text: 'How employees have rated this company:'
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 5    
      }
    }]
  }
};

// Card props are passed down from the formatted company object on the search page
class Card extends Component {

  // Initial state is an empty array for holding datapoints from glassdoor company reviews
  state = {
    companyData: []
  };

  // On mount, set the state of the component to include props passed down from company search
  componentDidMount() {
    const dataArr = [this.props.companies[0].compensation, this.props.companies[0].culture, this.props.companies[0].workLife, this.props.companies[0].opportunities, this.props.companies[0].recommended];
    this.setState({ companyData: dataArr });
  };

  render() {
    console.log(this.props.companies, 'Render')

    // Data for bar chart with display info as well as ratings data for the company that was searched
    const data = {
      labels: ['Compensation', 'Culture', 'Work/Life Balance', 'Opportunities'],
      datasets: [
        {
          label: 'Company Ratings',
          backgroundColor: '#FF5C62',
          borderColor: '#FF5C62',
          data: this.state.companyData
        }
      ]
    };

    return (
    <div className="row mb-5">
      <div className="col-lg-12">
        {/* map over the company from the company state that was passed down to create cards for each company in the array */}
        {this.props.companies.map(company => (
          <div className="card mt-4 company-card">
            <div className="card-body">
              <div className="card-title">
                <img src={company.logo} className="company-logo" alt='company logo' />
                <h2 className="company-name">{company.name}</h2>
              </div>

              <h6 className="industry">Industry: {company.industry}</h6>
              <h6 className="card-subtitle mb-2 text-muted">Overall rating (out of 5): {company.overall}</h6>
              <div className="media">
                <img src={company.ceoPic} className="align-self-center ceo-headshot" alt="ceo headshot"/>
                <Row className="media-body">

                  <Col size="sm-6" className="info-holder">
                    <h6 className="mt-0">Company CEO: {company.ceo}</h6>
                    <p>CEO Rating: {company.ceoRating}</p>
                    <p>Total ratings: {company.totalRatings}</p>
                    <p>Ratings summary: {company.description}</p>
                    <p>Percentage of employees who recommend working here: {company.recommended}%</p>
                    <p className="top-review">Top review: <span className="font-italic">{company.topReview}</span></p>
                  </Col>

                  <Col size="sm-6" className="chart-container">
                    <Bar 
                      data={data} 
                      options={options}
                      width={100}
                      height={100}
                    />
                  </Col>
                </Row>
              </div>

              <a className="btn btn-info mr-1 mt-2 reviews-btn" href={company.reviews} target="_blank" rel="noopener noreferrer">See More Reviews</a>
              {/* <a className="btn btn-info mr-1 mt-2 site-btn" href={company.website} target="_blank" rel="noopener noreferrer">Visit Site</a> */}
            </div>
          </div>
        ))}
      </div>
    </div>
    )
  }
}

export default Card;