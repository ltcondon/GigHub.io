import React, { Component } from 'react';
import API from '../../utils/API';
import CompanyCard from '../CompanyCard';
import './style.css';

import SearchIcon from '@material-ui/icons/Search';
import Jumbotron from '../Jumbotron';
import Slide from 'react-reveal/Slide';
import Bounce from 'react-reveal/Bounce';

// Format glassdoor API results and assign key value pairs 
const formatResults = glassdoorApiResults => {
	const resultsArray = [];
	
	// console.log(glassdoorApiResults);

	// Shorthand variable to get to the data points we want
	const dataPath = glassdoorApiResults.response.employers;

	// Formatted company object that can then be mapped to the company card component for display
	const formattedCompany = {
		name: dataPath[0].name,
		logo: dataPath[0].squareLogo,
		industry: dataPath[0].industry,
		ceo: dataPath[0].ceo && dataPath[0].ceo.name
			? dataPath[0].ceo.name
			: ['Could not find CEO'],
		ceoPic: dataPath[0].ceo.image && dataPath[0].ceo.image.src 
			? dataPath[0].ceo.image.src 
			: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',	
		overall: dataPath[0].overallRating,
		description: dataPath[0].ratingDescription,
		opportunities: dataPath[0].careerOpportunitiesRating,
		compensation: dataPath[0].compensationAndBenefitsRating,
		culture: dataPath[0].cultureAndValuesRating,
		totalRatings: dataPath[0].numberOfRatings,
		workLife: dataPath[0].workLifeBalanceRating,
		recommended: dataPath[0].recommendToFriendRating,
		reviews: glassdoorApiResults.response.attributionURL,
		website: dataPath[0].website,
		topReview: dataPath[0].featuredReview && dataPath[0].featuredReview.headline
			? dataPath[0].featuredReview.headline
			: ['No featured review found, click "see more reviews" to visit Glassdoor and read what employees have said about this company'],
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
    // console.log("handle form");
    // console.log(this.state.company);
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
		<div>
		  <Slide top duration={675}>
		    <div className="top-section">

					<Jumbotron>
					  <h1 className="text-uppercase">Company Ratings Search</h1>
					  <p className="lead text-center subHead"><i>Enter the name of a company below to see ratings from people who have worked there</i></p>
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

			  </div>	
		  </Slide>

		  <div id="show-results">
			{this.state.apiJobs.length ? (
				<Bounce bottom>
				  <CompanyCard
					  companies={this.state.apiJobs}
				  />
				</Bounce>
			) : (	
				<div className="mx-auto">
					<p className="mx-auto text-center noResults">No results yet...</p>
				</div>
			)}	
		  </div>
		</div>
	)
  }
}

export default CompanySearch;