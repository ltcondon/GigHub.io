import React, { Component } from 'react';
import API from '../../utils/API';
import "./style.css";
// import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddJobIcon from '@material-ui/icons/AddBox'
import Slide from '@material-ui/core/Slide';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

// Defines the transition path for the modal dialog so that it slides from bottom of screen
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class FormDialog extends Component {
    state = {
      open: false,
      company: '',
      role: '',
      status: '',
      milestone: '',
      createdAt: ''
    };

    // componentWillMount () {
    //   this.setState({...this.props.state})
    // }
  
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
            status: this.state.status,
            milestone: this.state.milestone,
            userID: this.props.state.id
        };

        // console.log(newJob);

        API.saveJob(newJob)
        .then(res => {
            console.log(res.status, res.statusText);
            alert('Job Added!', {type: 'success'})
            API.getUserJobs(this.props.state.id)
            .then(userJobs => {
                userJobs.data.map(userJob => {
                    return console.log(userJob);

                })
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
          <button id="addJobBtn" className="btn grow center" onClick={this.handleClickOpen}><AddJobIcon className="align-middle"/> Add Job</button>


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
                id="status"
                label="Status"
                type="text"
                placeholder="In Progress"
                onChange={this.onChangeStatus}
                fullWidth
              />
            </DialogContent>
            <DialogContent className="milestone-dialog">
              <DialogContentText></DialogContentText>
              <InputLabel htmlFor="milestone-input">Milestone</InputLabel>
              <Select
                autoFocus
                value={this.state.milestone}
                // margin="dense"
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
