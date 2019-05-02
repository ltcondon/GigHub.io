import React, { Component } from "react";

var endpoint = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=177283&t.k=ffvMT8m8Fem&action=employers&userip=192.168.43.42&useragent=Mozilla/%2F4.0&callback=?";
var currentPage = 1;

export default class CompanySearch extends Component {
	// constructor(props) {
	// 	super(props);
	// }

$(document).ready(function(){

    $(".do-search").click(searchCompanies);    
});

// Function to kick off AJAX request:
function searchCompanies(event){

    event.preventDefault();
    $("#show-results").hide();
    $("#tbl-results > tbody").empty();
    $("#error-panel").hide();
    
    var itemClicked = event.currentTarget.id;
    var pageToRequest;

    if (itemClicked == "btn-submit") {
        pageToRequest = 1;
    }
    else if (itemClicked == "next") {
        pageToRequest = ++currentPage;
    }
    else if (itemClicked == "previous") {
        pageToRequest = --currentPage;
    }


    // Build the AJAX request:
    $.getJSON(endpoint,	{	
        q: $("#input-search").val(),
        ps: 10,
        pn: pageToRequest
    })
        .done(showResults)
        .fail(showError);
}

function showResults(data){
    console.log(data.response.employers);
    $.each( data.response.employers, function( i, employer ) {
       
        var ceoName = employer.ceo && employer.ceo.name
            ? employer.ceo.name
            : "";

        var ratings = "Company: " + employer.overallRating
            + "<br>Career Opportunities: " + employer.careerOpportunitiesRating
            + "<br>Compensation & Benefits: " + employer.compensationAndBenefitsRating
            + "<br>Culture and Values: " + employer.cultureAndValuesRating
            + "<br>Senior Leadership: " + employer.seniorLeadershipRating
            + "<br>Recommend to a Friend: " + employer.recommendToFriendRating
            + "<br>Work-life Balance: " + employer.workLifeBalanceRating
            + "<br>Total Number of Ratings: " + employer.numberOfRatings
            + (employer.ceo && employer.ceo.name && employer.ceo.numberOfRatings
                ? "<br>CEO Approval: " + employer.ceo.pctApprove + "% " + "(" + employer.ceo.numberOfRatings + " Ratings)"
                : employer.ceo && employer.ceo.name
                    ? "<br>CEO Approval: No data"
                    : "");					
        
        $("#show-results").show(); 
        $(".table").append("<tr><td>" + employer.id + "</td><td>" + employer.name  + "</td><td>" + ceoName + "</td><td>" + ratings + "</td></tr>");

        $(".page-indicator").text("Page " + data.response.currentPageNumber + " of " + data.response.totalNumberOfPages); 

        // TODO: Disable previous / next button if at first or last page
     
    });    
}

function showError(){
    $("#error-panel").show();
}

render() {
	return (
		<div className="container">
		  <div className="jumbotron">
			<h1>Glassdoor API Search</h1>
			<p className="lead">Enter a text value and search the Glassdoor API by company.</p>
			<p>The first page of results will return the company ID, company name, and any field that contains the word "rating" in it. If a CEO record exists, return the CEO name and CEO rating.</p>  
			<form>
			  <div className="input-group">
				<input id="input-search" type="text" className="form-control" placeholder="Search">
				<div className="input-group-btn">
				  <button id="btn-submit" className="btn btn-success do-search" type="submit">
					<i className="glyphicon glyphicon-search"></i>
				  </button>
				</div>
			  </div>
			</form>
			</div>
			<div id="show-results">
				<ul className="pager">
					<li><a id="previous" className="do-search" href="#">Previous</a></li>
					<li><span className="page-indicator"></span></li>
					<li><a id="next" className="do-search" href="#">Next</a></li>
				</ul>
				<table id="tbl-results" className="table table-striped">
					<thead>
					<tr>
						<th>Company ID</th>
						<th>Company</th>
						<th>CEO</th>
						<th>Ratings</th>
					</tr>
					</thead>
					<tbody>				
					</tbody>
				</table>
				<ul className="pager">
					<li><a id="previous" className="do-search" href="#">Previous</a></li>
					<li><span className="page-indicator"></span></li>
					<li><a id="next" className="do-search" href="#">Next</a></li>
				</ul>
			</div>
			<div id="error-panel" className="alert alert-warning">
  			Sorry, there was a problem accessing the remote service.  Please check your network connection or try again later.
			</div>

			<p>Powered by <a href='https://www.glassdoor.com/index.htm'><img src='https://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' alt='Glassdoor' /></a></p>
		</div>

		)
}

}