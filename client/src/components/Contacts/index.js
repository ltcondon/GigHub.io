import React, { Component } from "react";
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
import AddContactIcon from "@material-ui/icons/PlaylistAdd";
import Refresh from "@material-ui/icons/Refresh";
import { Col, Row } from "../Grid/Grid";
import Paper from "@material-ui/core/Paper";
import Slide from 'react-reveal/Slide';
import Tooltip from '@material-ui/core/Tooltip';

class Contacts extends Component {
  state = {
    open: false,
    fullName: '',
    company: '',
    email: '',
    linkedin: '',
    phone:'',
    relationship: '',
    createdAt: '',
    apiContacts: [],
    network: ''
  };

  // Grab state passed down from contact route from dashboard
  componentDidMount () {
    this.setState({...this.props.state});
    this.getContacts();
  };

  // Grab user contacts from db when component updates if userID has been passed down to this components' state
  componentDidUpdate (prevProps) {
    if (this.props.state.id !== prevProps.state.id) {
      this.setState({...this.props.state});
      this.getContacts();
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
  };

  // Event handler for removing a contact from the db with associated API call
  deleteContact = (contactId) => {
    API.deleteContact(contactId).then(res => {
      console.log(res.status, "Contact Deleted");
    })
  };

  // Hit the get API route for all contacts associated with current user's unique ID, and update network number to reflect number of contacts
  getContacts = () => {
    API.getUserContacts(this.props.state.id)
        .then(res => {
          // console.log(res);
          this.setState({apiContacts : res.data});
          // console.log(this.state.apiContacts);
          this.setState({network : res.data.length});
          console.log(this.state.network);
        });   
  };

  // Event handler for form submission, gathers form inputs and sends to db
  addContact = (e) => {
    e.preventDefault();
    this.handleClose();

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
        // console.log(res.status, res.statusText);
      })
  }

    render() {

      return (
        <div>
          <Slide top>
          <Paper className="contacts-section">
            <Row>
              <Col size="sm-8" className="info-area">
                <div className="image-container">
                  <img src="./img/business-affiliate-network.svg" alt="Network Visual" className="network-image" />
                </div>
                <div className="text-container">
                  <p className="header-text">Missed connections can mean missed opportunities—use GigHub to track all of your contacts' essential information and <span className="red-bold">keep growing your network!</span></p>
                </div>
                <button className="add-contact btn grow center" onClick={this.handleClickOpen}><AddContactIcon className="align-middle"/>Add Contact</button>

                <Tooltip title="Refresh" placement="right-end">
                  <button className="refresh-db btn grow center" onClick={this.getContacts}><Refresh className="align-middle refresh-icon" /></button>
                </Tooltip>
              </Col>
              
              <Col size="sm-4">
                <div className="network-box card mx-auto">
                  <p className="network-header">People in your network:</p>
                  <p className="center align-middle network-counter mx-auto">{this.state.network}</p> 
                </div>
              </Col>
            </Row>

            <Row className="contacts-display">
              <Col size="sm-12">
                <Paper className="contacts-list">
                  <table className="table table-striped table-dark table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Company</th>
                        <th scope="col">Email</th>
                        <th scope="col">LinkedIn</th>
                        <th scope="col">Phone #</th>
                        <th scope="col">Relationship</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>

                    <tbody className="contacts-table">
                      {this.state.apiContacts.map((contact, index) => (
                        <tr key={index}>
                          <td>{contact.fullName}</td>
                          <td>{contact.company}</td>
                          <td>{contact.email}</td>
                          <td>{contact.linkedin}</td>
                          <td>{contact.phone}</td>
                          <td>{contact.relationship}</td>
                          <td><button className="delete-contact btn" onClick={this.deleteContact(this._id)}>X</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>	
                </Paper>
              </Col>
            </Row>
          </Paper>
          </Slide>

          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            onSubmit={this.addContact}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Enter all the essentials below, then click "Add Contact" once you're finished</DialogTitle>
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