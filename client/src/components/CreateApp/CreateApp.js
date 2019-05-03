import React, { Component } from 'react';
// import axios from 'axios';
import API from '../../utils/API'

export default class CreateApp extends Component {
    constructor(props) {

        super(props);

        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        // this.onCreate = this.onCreate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            company: '',
            role: '',
            status: [{
                position: '',
                updatedAt: ''
            }],
            createdAt: ''
        }
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            position: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Job App Created`);
        console.log(`Company: ${this.state.company}`);
        console.log(`Role: ${this.state.role}`);
        console.log(`Status: ${this.state.position}`);
        console.log(`Updated: ${this.state.status.updatedAt}`);
        console.log(`Date: ${this.state.createdAt}`);

        const newJob = {
            company: this.state.company,
            role: this.state.role,
            status: [
                {
                    position: this.state.position,
                    updated: this.state.status.updatedAt
                }
            ],
            date: this.state.createdAt
        };

        console.log(newJob);

        // axios.post('http://localhost:3000/gighub/add/', newJob)
        //     .then(res => console.log(res.data));

        API.saveJob(newJob)
        .then(res => {
            console.log(res.status, res.statusText);
            alert('Job Added!', {type: 'success'})
          })

        this.setState({
            company: '',
            role: '',
            status: [{
                position: '',
                updatedAt: ''
            }],
            createdAt: ''
        })
    }



    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create Job</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Company: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.company}
                            onChange={this.onChangeCompany}
                        />
                    </div>
                    <div className="form-group">
                        <label>Role: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.role}
                            onChange={this.onChangeRole}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="Interested"
                                value="Interested"
                                checked={this.state.position === 'Interested'}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label">Interested</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="Applied"
                                value="Applied"
                                checked={this.state.position === 'Applied'}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label">Applied</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="Phone-Screen"
                                value="Phone Screen"
                                checked={this.state.position === 'Phone Screen'}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label">Phone Screen</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="On-Site"
                                value="On Site"
                                checked={this.state.position === 'On Site'}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label">On Site</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="Hired"
                                value="Hired"
                                checked={this.state.position === 'Hired'}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label">Hired</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="statusOptions"
                                id="Disappointed"
                                value="Disappointed"
                                checked={this.state.position === 'Disappointed'}
                                onChange={this.onChangeStatus}
                            />
                            <label className="form-check-label">Disappointed</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Job App" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}