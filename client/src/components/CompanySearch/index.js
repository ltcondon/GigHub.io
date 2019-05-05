import React, { Component } from 'react';
import API from '../../utils/API';
import CompanyCard from '../CompanyCard';
import './style.css';

const formatResults = glassdoorApiResults => {
	const resultsArray = [];

	glassdoorApiResults.map(company => {

		// Formatted company object for passing down object to display
		const formattedCompany = {
			ceo: company.employer.ceo && company.employer.ceo.name
				? company.employer.ceo.name
				: ['Could not find CEO'],
			ceoPic: company.employer.ceo.image && company.employer.ceo.image.src 
				? company.employer.ceo.image.src 
				: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',	
			
		};

		resultsArray.push(formattedCompany);
		return resultsArray;
	});
	return resultsArray;
};


// Company search is a stateful component that queries the Glassdoor API to get back employer/company data
class CompanySearch extends Component {

  // Initial state is an empty array for holding api search results
  state = {
	  apiJobs: [],
  };

  // Handler for keeping track of user input on the form
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handler for form submission that triggers API call
  handleFormSubmit = event => {
    event.preventDefault();
    console.log("handle form");
    API.searchGlassdoor(this.state.company)
        .then(res => {
            const formattedArray = formatResults(res.data.items);
            this.setState({apiJobs: formattedArray});
        })
        .catch(err => console.log(err));
  };

// function showResults(data){
//     console.log(data.response.employers);
//     $.each( data.response.employers, function( i, employer ) {
       
//         var ceoName = employer.ceo && employer.ceo.name
//             ? employer.ceo.name
//             : "";
//         var ceoPic = employer.ceo.image && employer.ceo.image.src ? employer.ceo.image.src : ""; 


//         var ratings = "Company: " + employer.overallRating
//             + "<br>Career Opportunities: " + employer.careerOpportunitiesRating
//             + "<br>Compensation & Benefits: " + employer.compensationAndBenefitsRating
//             + "<br>Culture and Values: " + employer.cultureAndValuesRating
//             + "<br>Senior Leadership: " + employer.seniorLeadershipRating
//             + "<br>Recommend to a Friend: " + employer.recommendToFriendRating
//             + "<br>Work-life Balance: " + employer.workLifeBalanceRating
//             + "<br>Total Number of Ratings: " + employer.numberOfRatings
//             + (employer.ceo && employer.ceo.name && employer.ceo.numberOfRatings
//                 ? "<br>CEO Approval: " + employer.ceo.pctApprove + "% " + "(" + employer.ceo.numberOfRatings + " Ratings)"
//                 : employer.ceo && employer.ceo.name
//                     ? "<br>CEO Approval: No data"
//                     : "");					
        
//         $("#show-results").show(); 
//         $(".table").append("<tr><td>" + employer.id + "</td><td>" + employer.name + "<br><a href=" + employer.featuredReview.attributionURL + " target='_blank'>" + "<img src=" + employer.squareLogo + "> </a> </br>"  + "</td><td>" + ceoName +"<br><img src=" + ceoPic + "> </br>" + "</td><td>" + ratings + "</td></tr>");

//         $(".page-indicator").text("Page " + data.response.currentPageNumber + " of " + data.response.totalNumberOfPages); 

//         // TODO: Disable previous / next button if at first or last page
     
//     });    
// }

  render() {
	return (
		<div className="container">
		  <div className="jumbotron">
			<h1>Glassdoor API Search</h1>
			<p className="lead">Enter the name of a company below and search the Glassdoor API to see ratings and other key information</p>
			<p>The first page of results will return the company ID, company name, and any field that contains the word "rating" in it. If a CEO record exists, return the CEO name and CEO rating.</p>  
			<p>Powered by <a href='https://www.glassdoor.com/index.htm'><img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' alt='Glassdoor' /></a></p>
			<form>
			  <div className="input-group">
				<input value={this.state.company} onChange={this.handleInputChange} id="input-search" type="text" className="form-control" placeholder="Search" />

				<div className="input-group-btn">
				  <button id="btn-submit" className="btn btn-success do-search" type="submit" onClick={this.handleFormSubmit}>
					<i className="glyphicon glyphicon-search"></i>
				  </button>
				</div>
			  </div>
			</form>
		  </div>

		  <div id="show-results">
				
		  </div>
		</div>
	)
  }
}

export default CompanySearch;