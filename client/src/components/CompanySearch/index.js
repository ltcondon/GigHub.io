import React, { Component } from 'react';
import API from '../../utils/API';
import CompanyCard from '../CompanyCard';
import './style.css';

import SearchIcon from '@material-ui/icons/Search';
import Jumbotron from '../Jumbotron';

const formatResults = glassdoorApiResults => {
	const resultsArray = [];

	glassdoorApiResults.map(company => {

		// Formatted company object that can then be mapped to te company card component for display
		const formattedCompany = {
			name: company.employer.name,
			ceo: company.employer.ceo && company.employer.ceo.name
				? company.employer.ceo.name
				: ['Could not find CEO'],
			ceoPic: company.employer.ceo.image && company.employer.ceo.image.src 
				? company.employer.ceo.image.src 
				: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',	
			overall: company.employer.overallRating,
			opportunities: company.employer.careerOpportunitiesRating,
			compensation: company.employer.compensationAndBenefitsRating,
			culture: company.employer.cultureAndValuesRating,
			totalRatings: company.employer.numberOfRatings,
			workLife: company.employer.workLifeBalanceRating,
			website: company.employer.website,
			ceoRating: company.employer.ceo && company.employer.ceo.name && company.employer.ceo.numberOfRatings
				? company.employer.ceo.pctApprove
				: company.employer.ceo && company.employer.ceo.name
				? "No Ceo Data"
				: "",
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

  render() {
	return (
		<div className="container">
		  <Jumbotron>
			<h1>Glassdoor Company Search</h1>
			<p className="lead text-center subHead">Enter the name of a company below and search the Glassdoor API to see ratings and other key datapoints</p>
			<p id="glassdoorLogo" className="mx-auto text-center">Powered by <a href='https://www.glassdoor.com/index.htm'><img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' alt='Glassdoor' /></a></p>
		  </Jumbotron>
			<form>
			  <div className="input-group searchForm">
				<input value={this.state.company} onChange={this.handleInputChange} id="input-search" type="text" className="form-control" placeholder="Search" />

				<button id="btn-submit" className="btn searchGlassdoor" type="submit" onClick={this.handleFormSubmit}>
					<SearchIcon className="searchIcon" />
				</button>
				
			  </div>
			</form>

		  <div id="show-results">
			{this.state.apiJobs.length ? (
				<CompanyCard
					companies={this.state.apiJobs}
				/>
			) : (	
			  <div className="mx-auto">
                <h3 className="mx-auto text-center noResults">Enter a company name above to start seeing company info!</h3>
              </div>
			)}	
		  </div>
		</div>
	)
  }
}

export default CompanySearch;