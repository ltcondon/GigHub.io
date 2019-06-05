import React, { Component } from "react";
// import "./style.css";
import API from "../../utils/API";
// import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddJobIcon from '@material-ui/icons/AddBox'
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

class ToDo extends Component {

    state = {
        open: false,
        toDo: ''
    }

    // Grab state passed down from contact route from dashboard
  componentDidMount () {
    this.setState({...this.props.state});
    // this.getContacts();
  };

  // Grab user contacts from db when component updates if userID has been passed down to this components' state
  componentDidUpdate (prevProps) {
    if (this.props.state.id !== prevProps.state.id) {
      this.setState({...this.props.state});
    //   this.getContacts();
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
  onChangeToDo = (e) => {
    this.setState({
      toDo: e.target.value
    });
  }


  render() {
      return (
        <div>
            <button className="add-todo btn grow center" onClick={this.handleClickOpen}><AddContactIcon className="align-middle"/></button>


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
      )
  }
}

export default ToDo;
