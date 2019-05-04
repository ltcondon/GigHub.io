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