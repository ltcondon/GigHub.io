import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import { Col, Row } from "../Grid/Grid";
import Paper from "@material-ui/core/Paper";
import Fade from 'react-reveal/Fade';

class JobsTable extends Component {
  state = {
    company: '',
    role: '',
    location: '',
    milestone:'',
    createdAt: '',
    apiJobs: []
  };
  
   // Grab state passed down from contact route from dashboard and get user jobs from db on page load
   componentDidMount () {
    this.setState({...this.props.state});
    this.getUserJobs();
  };

  // Grab user jobs from db when component updates if userID has been passed down to this components' state
  componentDidUpdate (prevProps) {
    if (this.props.state.id !== prevProps.state.id) {
      this.setState({...this.props.state});
      this.getUserJobs();
    }
  };

  // Grab all jobs with passed in user ID form db
  getUserJobs = () => {
    API.getActiveJobs(this.props.state.id)
        .then(res => {

            this.setState({apiJobs : res.data});

        }); 
  };

  // Set status of a job to archived, so it will no longer appear in the table but can still be used for analytics purposes
  archiveUserJob = (e) => {
    const jobId = e.target.id;

    API.archiveUserJob(jobId)
      .then(res => {
          console.log("Job Archived")
      });
      this.getUserJobs();
  };
  

    render() {

      return (
        <div>
          <Fade bottom duration={650}>
          <Paper className="contacts-section">
            <Row className="contacts-display">
              <Col size="sm-12">
                <Paper className="contacts-list">
                  <table className="table table-striped table-dark table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Company</th>
                        <th scope="col">Role</th>
                        <th scope="col">Location</th>
                        <th scope="col">Milestone</th>
                        <th scope="col">Created</th>
                        <th scope="col">Updated</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>

                    <tbody className="contacts-table">
                      {this.state.apiJobs.map((job, index) => (
                        <tr key={index}>
                          <td>{job.company}</td>
                          <td>{job.role}</td>
                          <td>{job.location}</td>
                          <td>{job.milestone}</td>
                          <td>{job.createdAt}</td>
                          <td>{job.Updated}</td>
                          <td><button className="delete-job btn" id={job._id} onClick={ (e) => { if (window.confirm('Delete this job?')) this.archiveUserJob(e) }}>X</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>	
                </Paper>
              </Col>
            </Row>
          </Paper>
          </Fade>
        </div>
      );
    }
}

export default JobsTable;