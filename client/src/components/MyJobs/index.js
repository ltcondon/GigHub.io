import React, { Component } from 'react';
// import EnhancedTable from '../EnhancedTable/index';
import TempJobsTable from '../TempJobsTable';
import CreateApp from '../CreateApp/CreateApp';
import Fade from 'react-reveal/Fade';

export default class MyJobs extends Component {

    state = {}

    componentDidMount() {
        this.setState({...this.props.state})
    }
    
    render() {
        return (
            <div>
                <CreateApp state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
                <Fade bottom duration={650}>    
                  {/* <EnhancedTable state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/> */}
                  <TempJobsTable state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
                </Fade>
            </div>
        )
    }
}