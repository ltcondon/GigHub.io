import React, { Component } from 'react';
// import axios from 'axios';
import API from '../../utils/API'
// import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddJobIcon from '@material-ui/icons/AddBox'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


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

    onChangeMilestone = (e) => {
        this.setState({
            milestone: e.target.value
        });
    }

    publish = (e) => {
        e.preventDefault();

        console.log(`Job App Created`);
        console.log(`Company: ${this.state.company}`);
        console.log(`Role: ${this.state.role}`);
        console.log(`Status: ${this.state.status}`);
        console.log(`Milestone: ${this.state.milestone}`);
        console.log(`Date: ${new Date()}`);
        console.log(`UserID: ${this.props.state.id}`);

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
          <ListItem button id='addJobBtn' className='listBtn' onClick={this.handleClickOpen}>
            <ListItemIcon className='listIcon'>
                <AddJobIcon />
            </ListItemIcon>
            <ListItemText primary='Add a Job' className='listTxt' />
          </ListItem>

          <Dialog
            open={this.state.open}
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
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="milestone"
                label="Milestone"
                type="text"
                placeholder="Applied"
                onChange={this.onChangeMilestone}                
                fullWidth
              />
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
