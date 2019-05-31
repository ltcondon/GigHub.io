import React, { Component } from 'react';
import "./style.css";
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
import AddContactIcon from '@material-ui/icons/AddBox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default class Contacts extends Component {
  state = {
    open: false,
    company: '',
    role: '',
    status: '',
    milestone: '',
    createdAt: ''
  };

  componentDidMount () {
    this.setState({...this.props.state})
  }
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  
  handleClose = () => {
    this.setState({ open: false });
  };
  
  addApp = () => {
    alert("Contact Added!")
    // window.location.reload()
  };

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

  addContact = (e) => {
    e.preventDefault();

    const newContact = {
      company: this.state.company,
      role: this.state.role,
      status: this.state.status,
      milestone: this.state.milestone,
      userID: this.state.id
    };

    API.saveContact(newContact)
      .then(res => {
        console.log(res.status, res.statusText);
        alert('Contact Added!', {type: 'success'})
        API.getUserContacts(this.state.id)
        .then(userContacts => {
            userContacts.data.map(userContact => {
              return console.log(userContact);
            })
            window.location.reload()
        })
      })
    }

    render() {

      return (
        <div>
          <div className="container">
            <p>Missed connections can mean missed opportunities—keep track of your contacts here so you won't miss another!</p>
            <ListItem button id='addJobBtn' className='listBtn' onClick={this.addContact}>
              <ListItemIcon className='listIcon'>
                <AddContactIcon />
            </ListItemIcon>
            <ListItemText primary='Add Contact' className='listTxt' />
            </ListItem>
          </div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            onSubmit={this.addApp}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Contact Details</DialogTitle>
            <DialogContent>
              <DialogContentText>Missed connections can mean missed opportunities, track your contacts here so you won'</DialogContentText>
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
              <Button onClick={this.addContact} color="primary">
                Add Contact
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
}
