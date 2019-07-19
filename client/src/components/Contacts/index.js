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
import AddContactIcon from "@material-ui/icons/PlaylistAdd";
import Refresh from "@material-ui/icons/Refresh";
import { Col, Row } from "../Grid/Grid";
import Paper from "@material-ui/core/Paper";
import Slide from 'react-reveal/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import DialogSlide from '@material-ui/core/Slide';
import Fade from 'react-reveal/Fade';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <DialogSlide direction="up" ref={ref} {...props} />;
});

class Contacts extends PureComponent {
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
  deleteContact = (e) => {
    const contactId = e.target.id;
    console.log(contactId);
    API.deleteContact(contactId).then(res => {
      console.log(res.status, "Contact Deleted");
    });
    this.getContacts();
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

    this.getContacts();
  }

  editDetails = (e) => {
    console.log(`ID: ${e.target.id} Value: ${e.target.textContent}`);

    const name = e.target.getAttribute('name');
    console.log(`name: ${name}`);

    const value = e.target.textContent.trim();
    const baseline = e.target.getAttribute('value').trim();
    const contactID = e.target.id;

    const details = {
      [name]: value
    };

    if (baseline !== value) {

      API.updateContact(contactID, details)
        .then(res => {
          console.log("updates made");
          console.log(res.status, res.statusText);
      })
    } else {
      console.log("no update necessary");
    }
  }

    render() {

      return (
        <div>
          <Slide top duration={675}>
          <Paper className="contacts-section-header">
            <Row>
              <Col size="sm-8" className="info-area">
                <div className="image-container">
                  <img src="./img/business-affiliate-network.svg" alt="Network Visual" className="network-image" />
                </div>
                <div className="text-container">
                  <p className="header-text">Missed connections can mean missed opportunities—use GigHub to track all of your contacts' essential information and <span className="red-bold">keep growing your network!</span></p>
                </div>
                <button className="add-contact btn grow center" onClick={this.handleClickOpen}><AddContactIcon className="align-middle"/> Add Contact</button>

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

          </Paper>
          </Slide>

          <Fade bottom duration={650}>
          <Paper className="contacts-section">
          {this.state.apiContacts.length ? (
          <div className="title"><p><span className="updates">People change! </span> Make any updates right in the table below     ✎ </p></div>
          
          ):(<div></div>)}
            <Row className="contacts-display">
              <Col size="sm-12">
                <Paper className="contacts-list">
                  <table className="table table-striped table-dark table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Company / Role</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone #</th>
                        <th scope="col">Relationship</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>

                    {this.state.apiContacts.length ? (
                    <tbody className="contacts-table">
                      {this.state.apiContacts.map((contact, index) => (
                        <tr key={index}>
                          <td contentEditable='true' name={'fullName'} onBlur={this.editDetails} id={contact._id} value={contact.fullName} suppressContentEditableWarning="true">{contact.fullName}</td>
                          <td contentEditable='true' name={'company'} onBlur={this.editDetails} id={contact._id} value={contact.company} suppressContentEditableWarning="true">{contact.company}</td>
                          <td contentEditable='true' name={'email'} onBlur={this.editDetails} id={contact._id} value={contact.email} suppressContentEditableWarning="true">{contact.email}</td>
                          <td contentEditable='true' name={'phone'} onBlur={this.editDetails} id={contact._id} value={contact.phone} suppressContentEditableWarning="true">{contact.phone}</td>
                          <td contentEditable='true' name={'relationship'} onBlur={this.editDetails} id={contact._id} value={contact.relationship} suppressContentEditableWarning="true">{contact.relationship}</td>
                          <td><button className="delete-contact btn" id={contact._id} onClick={ (e) => { if (window.confirm('Delete this contact?')) this.deleteContact(e) }}>X</button></td>
                        </tr>
                      ))}
                    </tbody>
                    ):(
                      <div className="container" id="noContactBox">
                        <h1>No Contacts yet... Add some above!</h1>
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
            {/* <DialogContent>
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
            </DialogContent> */}
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