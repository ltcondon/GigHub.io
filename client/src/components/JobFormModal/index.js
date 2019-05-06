import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Apply for a new Job
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Job Details</DialogTitle>
          <DialogContent>
            <DialogContentText>Company</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Facebook"
              type="company"
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Role</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Software Engineer"
              type="role"
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Status</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="In Progress"
              type="status"
              fullWidth
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>Milestone</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Applied"
              type="company"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
