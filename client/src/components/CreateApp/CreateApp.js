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


export default class FormDialog extends Component {
    state = {
      open: true,
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
        alert("Job Added!")
            window.location.reload()

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
        console.log(`UserID: ${this.state.id}`);

        const newJob = {
            company: this.state.company,
            role: this.state.role,
            status: this.state.status,
            milestone: this.state.milestone,
            userID: this.state.id
        };

        // console.log(newJob);

        API.saveJob(newJob)
        .then(res => {
            console.log(res.status, res.statusText);
            alert('Job Added!', {type: 'success'})
            API.getUserJobs(this.state.id)
            .then(userJobs => {
                userJobs.data.map(userJob => {
                    return console.log(userJob);

                })
                window.location.reload()
            })
        })
    }

    render() {
        if (!this.state.open) {

            window.location.reload()
        }
    

      return (
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            onSubmit={this.addApp}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Job Details</DialogTitle>
            <DialogContent>
              <DialogContentText>Congrats <span className="userName">{this.state.firstName}!</span> Way to take initiative! The first step can often be the hardest, but we're here to help. Provide some details below.</DialogContentText>
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
  


// export default class CreateApp extends Component {
//     constructor(props) {

//         super(props);

//         this.onChangeCompany = this.onChangeCompany.bind(this);
//         this.onChangeRole = this.onChangeRole.bind(this);
//         this.onChangeStatus = this.onChangeStatus.bind(this);
//         // this.onCreate = this.onCreate.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);


//         this.state = {
//             company: '',
//             role: '',
//             status: [{
//                 position: '',
//                 updatedAt: ''
//             }],
//             createdAt: '',
//         }
//     }

//     componentDidMount() {
//         this.setState({id: this.props.id});
//     };

//     onChangeCompany(e) {
//         this.setState({
//             company: e.target.value
//         });
//     }

//     onChangeRole(e) {
//         this.setState({
//             role: e.target.value
//         });
//     }

//     onChangeStatus(e) {
//         this.setState({
//             position: e.target.value
//         });
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         console.log(`Job App Created`);
//         console.log(`Company: ${this.state.company}`);
//         console.log(`Role: ${this.state.role}`);
//         console.log(`Status: ${this.state.position}`);
//         console.log(`Updated: ${this.state.status.updatedAt}`);
//         console.log(`Date: ${new Date()}`);
//         console.log(`UserID: ${this.state.id}`);


//         const newJob = {
//             company: this.state.company,
//             role: this.state.role,
//             status: [
//                 {
//                     position: this.state.position,
//                     updated: new Date(),
//                 }
//             ],
//             date: this.state.createdAt,
//             userID: this.state.id
//         };

//         console.log(newJob);

//         // API.saveJob(newJob)
//         // .then(res => {
//         //     console.log(res.status, res.statusText);
//         //     alert('Job Added!', {type: 'success'})
//         //     API.getUserJobs(this.props.location.state.id)
//         //     .then(userJobs => {
//         //         userJobs.data.map(userJob => {
//         //             return console.log(userJob);

//         //         })
//         //         // console.log(userJobs.data);
//         //     })
//         // })
          

//         this.setState({
//             company: '',
//             role: '',
//             status: [{
//                 position: '',
//                 updatedAt: ''
//             }],
//             createdAt: ''
//         })
//     }



//     render() {

//         return (
//             <div style={{ marginTop: 10 }}>
//                 <h3>Create Job ID={this.state.id}</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className="form-group">
//                         <label>Company: </label>
//                         <input type="text"
//                             className="form-control"
//                             value={this.state.company}
//                             onChange={this.onChangeCompany}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Role: </label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             value={this.state.role}
//                             onChange={this.onChangeRole}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <div className="form-check form-check-inline">
//                             <input className="form-check-input"
//                                 type="radio"
//                                 name="statusOptions"
//                                 id="Interested"
//                                 value="Interested"
//                                 checked={this.state.position === 'Interested'}
//                                 onChange={this.onChangeStatus}
//                             />
//                             <label className="form-check-label">Interested</label>
//                         </div>

//                         <div className="form-check form-check-inline">
//                             <input className="form-check-input"
//                                 type="radio"
//                                 name="statusOptions"
//                                 id="Applied"
//                                 value="Applied"
//                                 checked={this.state.position === 'Applied'}
//                                 onChange={this.onChangeStatus}
//                             />
//                             <label className="form-check-label">Applied</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                             <input className="form-check-input"
//                                 type="radio"
//                                 name="statusOptions"
//                                 id="Phone-Screen"
//                                 value="Phone Screen"
//                                 checked={this.state.position === 'Phone Screen'}
//                                 onChange={this.onChangeStatus}
//                             />
//                             <label className="form-check-label">Phone Screen</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                             <input className="form-check-input"
//                                 type="radio"
//                                 name="statusOptions"
//                                 id="On-Site"
//                                 value="On Site"
//                                 checked={this.state.position === 'On Site'}
//                                 onChange={this.onChangeStatus}
//                             />
//                             <label className="form-check-label">On Site</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                             <input className="form-check-input"
//                                 type="radio"
//                                 name="statusOptions"
//                                 id="Hired"
//                                 value="Hired"
//                                 checked={this.state.position === 'Hired'}
//                                 onChange={this.onChangeStatus}
//                             />
//                             <label className="form-check-label">Hired</label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                             <input className="form-check-input"
//                                 type="radio"
//                                 name="statusOptions"
//                                 id="Disappointed"
//                                 value="Disappointed"
//                                 checked={this.state.position === 'Disappointed'}
//                                 onChange={this.onChangeStatus}
//                             />
//                             <label className="form-check-label">Disappointed</label>
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <input type="submit" value="Create Job App" className="btn btn-primary" />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }