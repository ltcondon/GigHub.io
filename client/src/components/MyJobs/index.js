import React, { Component } from 'react';
import SimpleTable from '../SimpleTable/index';
import CreateApp from '../CreateApp/CreateApp';

export default class MyJobs extends Component {

    state = {}

    componentDidMount() {
        this.setState({...this.props.state})
    }

    // TO-DO: Maybe take out the mount method above and rewrite CreateApp props as props.state rather than .state
    
    render() {
        return (
            <div>
                <span className="userName">{this.state.firstName}!</span>
                <SimpleTable/>
                <CreateApp state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>

            </div>
        )
    }
}