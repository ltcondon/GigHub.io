import React from "react";
import "./style.css";

// Card props are passed down from the formatted company object on the search page
function Card(props) {
  return (
    <div className="row mb-5">
      <div className="col-lg-12">
        {/* map over the company from the company state that was passed down to create cards for each company in the array */}
        {props.companies.map(company => (
          <div className="card mt-4 company-card" key={company._id}>
            <div className="card-body">
              <img src={company.logo} className="company-logo" alt='company logo' />
              <h5 className="card-title">{company.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Overall rating: {company.overall}</h6>
              <div className="media">
                <img src={company.ceoPic} className="align-self-center mr-3" alt="ceo headshot"/>
                <div className="media-body">
                  <h6 className="mt-0">CEO: {company.ceo}</h6>
                  <p>CEO Rating: {company.ceoRating}</p>
                  <ul className="ratingsList">
                     <li key={company.compensation}>Compensation: {company.compensation}</li> 
                     <li key={company.workLife}>Work/Life Balance: {company.workLife}</li>
                  </ul>
                </div>
              </div>
              <a className="btn btn-info mr-1 mt-2" href={company.website} target="_blank"
                 rel="noopener noreferrer">View company</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default Card;