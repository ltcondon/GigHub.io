import React, { PureComponent } from "react";
import "./style.css";
import API from "../../utils/API";
// import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import AddJobIcon from '@material-ui/icons/AddBox'
import Refresh from "@material-ui/icons/Refresh";
import { Col, Row } from "../Grid/Grid";
import Paper from "@material-ui/core/Paper";
import Slide from 'react-reveal/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import DialogSlide from '@material-ui/core/Slide';
import Fade from 'react-reveal/Fade';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <DialogSlide direction="up" ref={ref} {...props} />;
});

class MyJobs extends PureComponent {
  state = {
    open: false,
    company: '',
    role: '',
    location: '',
    apiJobs: [],
    milestone: '',
    createdAt: ''
  };

  // Grab state passed down from contact route from dashboard
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
  
  // Event handlers for opening and closing modal dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };

  // Helper functions for keeping track of the state of form inputs, which can then be sent to the db
  onChangeCompany = (e) => {
    this.setState({
      company: e.target.value
    });
  }

  onChangeRole = (e) => {
    this.setState({
      role: e.target.value
    });
  }

  onChangeLocation = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value
    });
  }

  onChangeMilestone = name => (e) => {

      this.setState({ ...this.state, [name]: e.target.value });
  }

  // Event handler for removing a contact from the db with associated API call
  deleteJob = (e) => {
    const JobID = e.target.id;
    console.log(JobID);
    API.deleteJob(JobID).then(res => {
      console.log(res.status, "Job Deleted.");
    });
    this.getUserJobs();
  };

  // Hit the get API route for all jobs associated with current user's unique ID, and update network number to reflect number of jobs
  getUserJobs = () => {
    console.log("this state id: " + this.state.id);
    API.getActiveUserJobs(this.props.state.id)
        .then(userJobs => {
          this.setState({apiJobs : userJobs.data});
          // this.setState({numjobs : userJobs.data.length});
    })
  }

  // Event handler for form submission, gathers form inputs and sends to db
  addJob = (e) => {
    e.preventDefault();
    this.handleClose();

    const newJob = {
      company: this.state.company,
      role: this.state.role,
      location: this.state.location,
      milestone: this.state.milestone,
      userID: this.props.state.id
    };

    API.saveJob(newJob)
      .then(res => {
        console.log(res.status, res.statusText);
    })

    this.getUserJobs();
  }

  editDetails = (e) => {
    console.log(`ID: ${e.target.id} Value: ${e.target.textContent}`);

    const name = e.target.getAttribute('name');
    console.log(`name: ${name}`);

    const value = e.target.textContent.trim();
    const baseline = e.target.getAttribute('value').trim();
    const jobID = e.target.id;

    const details = {
      [name]: value,
      lastUpdated: Date.now()
    };

    const milestones = ['interested', 'applied', 'phone screen', 'code assessment', 'on-site', 'offer extended', 'not a good fit'];

    if (name === "milestone" && !milestones.includes(value.toLowerCase())) {

      e.target.textContent = baseline;
      return alert("Please set 'Milestone' to one of the following:\n\n Interested, Applied', Phone Screen', Code Assessment, On-site, Offer Extended, Not A Good Fit");
    }
    if (baseline !== value) {

      API.updateJob(jobID, details)
        .then(res => {
          console.log("updates sent");
          console.log(res.status, res.statusText);
      })
    
      this.notify();
    } else {
      console.log("no update necessary");
    }
  }

  notify = () => {
    toast("✅ Changes Saved", { autoClose: 7000 });
  }

    render() {

      return (
        <div>
          <Slide top duration={675}>
          <Paper className="contacts-section-header">
            <Row>
              <Col size="sm-8" className="info-area">
                <div className="image-container">
                  <img src="./img/rjsc8FTu9hLF8GhSY7HyhdNP1.png" alt="Jobs Visual" className="network-image" />
                </div>
                <div className="text-container">
                  <p className="header-text">All the essential information, all in one place. You're already well on your way to finding that <span className="red-bold">perfect gig!</span></p>
                </div>
                <button className="add-contact btn grow center" onClick={this.handleClickOpen}><AddJobIcon className="align-middle"/>Add Job</button>

                <Tooltip title="Refresh" placement="right-end">
                  <button className="refresh-db btn grow center" onClick={this.getUserJobs}><Refresh className="align-middle refresh-icon" /></button>
                </Tooltip>
              </Col>
              
              <Col size="sm-4">
                <div className="network-box card mx-auto">
                  <p className="network-header">Active Applications:</p>
                  <p className="center align-middle network-counter mx-auto">{this.state.apiJobs.length}</p> 
                </div>
              </Col>
            </Row>

          </Paper>
          </Slide>

          <Fade bottom duration={650}>
          <Paper className="contacts-section">
          {this.state.apiJobs.length ? (
          <div className="title"><p><span className="updates">Updates?  </span>  Make any changes right in the table below!   ✎ </p></div>
          
          ):(<div></div>)}
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

                  {this.state.apiJobs.length ? (
                    <tbody className="contacts-table">
                      {this.state.apiJobs.map((job, index) => (
                        <tr key={index}>
                          <td contentEditable='true' value={job.company} name={'company'} onBlur={this.editDetails} id={job._id} suppressContentEditableWarning="true">{job.company}</td>
                          <td contentEditable='true' value={job.role} name={'role'} onBlur={this.editDetails} id={job._id} suppressContentEditableWarning="true">{job.role}</td>
                          <td contentEditable='true' value={job.location} name={'location'} onBlur={this.editDetails} id={job._id} suppressContentEditableWarning="true">{job.location}</td>
                          <td contentEditable='true' value={job.milestone} name='milestone' onBlur={this.editDetails} id={job._id} suppressContentEditableWarning="true">{job.milestone}</td>
                          <td contentEditable='false' id={job._id} suppressContentEditableWarning="true">{moment(job.createdAt).fromNow()}</td>
                          <td contentEditable='false' id={job._id} suppressContentEditableWarning="true">{moment(job.lastUpdated).fromNow()}</td>
                          <td><button className="delete-contact btn" id={job._id} onClick={ (e) => { if (window.confirm('Delete this job?')) this.deleteJob(e) }}>X</button></td>
                        </tr>
                      ))}
                    </tbody>
                  ):(
                    <div className="container" id="noJobBox">
                      <h1>No Jobs yet... Add some above!</h1>
                    </div>
                  )}
                  </table>	
                </Paper>
              </Col>
            </Row>
          </Paper>
          </Fade>

          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            onClose={this.handleClose}
            onSubmit={this.addApp}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Job Details</DialogTitle>
            <DialogContent>
              <DialogContentText>Congrats <span className="userName">{this.props.state.firstName}!</span> Way to take initiative! The first step can often be the hardest, but we're here to help. Provide some details below.</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="company"
                label="Company"
                type="text"
                placeholder="Facebook"
                onChange={this.onChangeCompany}
                fullWidth
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="role"
                label="Role"
                type="text"
                placeholder="Software Engineer"
                onChange={this.onChangeRole}
                fullWidth
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="location"
                label="Location"
                type="text"
                placeholder="San Francisco"
                onChange={this.onChangeLocation}
                fullWidth
              />
            </DialogContent>
            <DialogContent className="milestone-dialog">
              <DialogContentText></DialogContentText>
              <InputLabel htmlFor="milestone-input">Milestone</InputLabel>
              <Select
                autoFocus
                value={this.state.milestone}
                id="milestone"
                label="Milestone"
                type="text"
                placeholder="Applied"
                onChange={this.onChangeMilestone("milestone")}
                input={<Input id="milestone-input" />}
                fullWidth
              >
                <MenuItem value={"Interested"}>Interested</MenuItem>
                <MenuItem value={"Applied"}>Applied</MenuItem>
                <MenuItem value={"Code Assessment"}>Code Assessment</MenuItem>
                <MenuItem value={"On-Site"}>On-Site</MenuItem>
                <MenuItem value={"Offer Extended"}>Offer Extended</MenuItem>
                <MenuItem value={"Not A Good Fit"}>Not A Good Fit</MenuItem>
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.addJob} color="primary">
                Add Job
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}

export default MyJobs;