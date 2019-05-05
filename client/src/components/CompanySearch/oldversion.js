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
