import React, { Component } from 'react';
import API from '../../utils/API';
import "./style.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddJobIcon from '@material-ui/icons/AddBox'
import DialogSlide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { Col, Row } from "../Grid/Grid";
import Paper from "@material-ui/core/Paper";
import Refresh from "@material-ui/icons/Refresh";
import Tooltip from '@material-ui/core/Tooltip';
import Slide from 'react-reveal/Slide';


// Defines the transition path for the modal dialog so that it slides from bottom of screen
const Transition = React.forwardRef(function Transition(props, ref) {
  return <DialogSlide direction="up" ref={ref} {...props} />;
});

export default class FormDialog extends Component {
    state = {
      open: false,
      company: '',
      role: '',
      location: '',
      numjobs: '',
      milestone: '',
      createdAt: ''
    };

    // Grab state passed down from contact route from dashboard
    componentDidMount () {
      this.setState({...this.props.state});
      API.getUserJobs(this.props.state.id)
          .then(userJobs => {
            this.setState({numjobs : userJobs.data.length});
      })
    };

    // Grab user contacts from db when component updates if userID has been passed down to this components' state
    componentDidUpdate (prevProps) {
      if (this.props.state.id !== prevProps.state.id) {
        this.setState({...this.props.state});
        API.getUserJobs(this.props.state.id)
            .then(userJobs => {
              this.setState({numjobs : userJobs.data.length});
        })
      }
    };

    
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    addApp = () => {
        alert("Job Added!")
        // window.location.reload()
    }

    getUserJobs = () => {
      API.getActiveJobs(this.props.state.id)
          .then(userJobs => {
            this.setState({numjobs : userJobs.data.length});
      })
    }

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
        // this.setState({
        //     milestone: e.target.value
        // });
        this.setState({ ...this.state, [name]: e.target.value });
    }

    publish = (e) => {
        e.preventDefault();

        const newJob = {
            company: this.state.company,
            role: this.state.role,
            location: this.state.location,
            milestone: this.state.milestone,
            userID: this.props.state.id
        };

        // console.log(newJob);

        API.saveJob(newJob)
        .then(res => {
            // console.log(res.status, res.statusText);
            alert('Job Added!', {type: 'success'})
            API.getUserJobs(this.props.state.id)
            .then(userJobs => {
                // userJobs.data.map(userJob => {
                //     return console.log(userJob);
                // })
                this.setState({numjobs : userJobs.data.length});
                this.handleClose();
            })
        })
    }

    render() {
        // if (!this.state.open) {

        //     window.location.reload()
        // }
    
      return (
        <div>
          <Slide top duration={500}>
          <Paper className="myjobs-section">
            <Row>
              <Col size="sm-8" className="info-area">
                <div className="image-container">
                  <img src="./img/rjsc8FTu9hLF8GhSY7HyhdNP1.png" alt="User Jobs Visual" className="myjobs-image" />
                </div>
                <div className="text-container">
                  <p className="header-text">All the essential information, all in one place. You're already well on your way to finding that <span className="red-bold">perfect gig!</span></p>
                </div>
                <button id="addJobBtn" className="btn grow center add-job" onClick={this.handleClickOpen}><AddJobIcon className="align-middle"/> Add Job</button>

                <Tooltip title="Refresh" placement="right-end">
                  <button className="refresh-db btn grow center" onClick={this.getUserJobs}><Refresh className="align-middle refresh-icon" /></button>
                </Tooltip>
              </Col>
              
              <Col size="sm-4">
                <div className="myjobs-box card mx-auto">
                  <p className="myjobs-header">Active jobs:</p>
                  <p className="center align-middle myjobs-counter mx-auto">{this.state.numjobs}</p> 
                </div>
              </Col>
            </Row>
          </Paper>
          </Slide>

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
              <Button onClick={this.publish} color="primary">
                Apply
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
