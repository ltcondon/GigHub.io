import React, { Component } from 'react';
import API from '../../utils/API';
import CompanyCard from '../CompanyCard';
import './style.css';

import SearchIcon from '@material-ui/icons/Search';
import Jumbotron from '../Jumbotron';

const formatResults = glassdoorApiResults => {
	const resultsArray = [];
	
	console.log(glassdoorApiResults);

	const dataPath = glassdoorApiResults.response.employers;

	// Formatted company object that can then be mapped to the company card component for display
	const formattedCompany = {
		name: dataPath[0].name,
		logo: dataPath[0].squareLogo,
		ceo: dataPath[0].ceo && dataPath[0].ceo.name
			? dataPath[0].ceo.name
			: ['Could not find CEO'],
		ceoPic: dataPath[0].ceo.image && dataPath[0].ceo.image.src 
			? dataPath[0].ceo.image.src 
			: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',	
		overall: dataPath[0].overallRating,
		opportunities: dataPath[0].careerOpportunitiesRating,
		compensation: dataPath[0].compensationAndBenefitsRating,
		culture: dataPath[0].cultureAndValuesRating,
		totalRatings: dataPath[0].numberOfRatings,
		workLife: dataPath[0].workLifeBalanceRating,
		website: dataPath[0].website,
		ceoRating: dataPath[0].ceo && dataPath[0].ceo.name && dataPath[0].ceo.numberOfRatings
			? dataPath[0].ceo.pctApprove
			: dataPath[0].ceo && dataPath[0].ceo.name
			? "No Ceo Data"
			: "",
	};

	resultsArray.push(formattedCompany);
	return resultsArray;
};


// Company search is a stateful component that queries the Glassdoor API to get back employers/company data
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
    console.log(this.state.company);
    API.searchGlassdoor(this.state.company)
        .then(res => {
        	// console.log(res.data);
            const formattedArray = formatResults(res.data);
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
				<input value={this.state.company} onChange={this.handleInputChange} name="company" id="input-search" type="text" className="form-control" placeholder="Search" />

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
                <h3 className="mx-auto text-center noResults">No results yet...</h3>
              </div>
			)}	
		  </div>
		</div>
	)
  }
}

export default CompanySearch;