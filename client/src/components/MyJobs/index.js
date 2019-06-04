import React, { Component } from 'react';
import EnhancedTable from '../EnhancedTable/index';
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
                <CreateApp state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
                <EnhancedTable state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
            </div>
        )
    }
}