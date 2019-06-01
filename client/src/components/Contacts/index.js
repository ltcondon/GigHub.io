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
import AddContactIcon from '@material-ui/icons/PlaylistAdd';

class Contacts extends Component {
  state = {
    open: false,
    fullName: '',
    company: '',
    email: '',
    linkedin: '',
    phone:'',
    relationship: '',
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
  
  addContact = () => {
    alert("Contact Added!")
    // window.location.reload()
  };

  onChangeName = (e) => {
    this.setState({
      fullName: e.target.value
    });
  }

  onChangeCompany = (e) => {
    this.setState({
      company: e.target.value
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  onChangeLinkedin = (e) => {
    this.setState({
      linkedin: e.target.value
    });
  }

  onChangePhone = (e) => {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeRelationship = (e) => {
    this.setState({
      relationship: e.target.value
    });
  }

  addContact = (e) => {
    e.preventDefault();

    const newContact = {
      fullName: this.state.fullName,
      company: this.state.company,
      email: this.state.email,
      linkedin: this.state.linkedin,
      phone: this.state.phone,
      relationship: this.state.relationship,
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
          <div className="container card contacts-section">
            <p className="header-text">Missed connections can mean missed opportunities—keep track of your contacts here so you won't miss another!</p>
            <button className="add-contact btn grow center" onClick={this.handleClickOpen}><AddContactIcon className="align-middle"/> Add Contact</button>

            <section className="contacts-list">

            </section>
          </div>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            onSubmit={this.addContact}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Enter all the essential details below, then click "Add Contact" once you're finished</DialogTitle>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="contact-name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                onChange={this.onChangeName}
                fullWidth
              />
            </DialogContent>
            <DialogContent className="float-right">
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="contact-company"
                label="Company/Job Title"
                type="text"
                placeholder="Google"
                onChange={this.onChangeCompany}
                fullWidth
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="contact-email"
                label="Email"
                type="text"
                placeholder="janedoe@gmail.com"
                onChange={this.onChangeEmail}
                fullWidth
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="contact-linkedin"
                label="LinkedIn"
                type="text"
                placeholder="LinkedIn profile URL"
                onChange={this.onChangeLinkedin}                
                fullWidth
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="contact-phone"
                label="Phone Number"
                type="text"
                placeholder="867-5309"
                onChange={this.onChangePhone}                
                fullWidth
              />
            </DialogContent>
            <DialogContent>
              <DialogContentText></DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="contact-relationship"
                label="How did you meet this person?"
                type="text"
                placeholder="Met at a conference on..."
                onChange={this.onChangeRelationship}                
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

export default Contacts;