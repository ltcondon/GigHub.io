import React, { Component } from 'react';
import SimpleTable from '../SimpleTable/index';
import CreateApp from '../CreateApp/CreateApp';
// import AddJobIcon from '@material-ui/icons/AddBox'
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';



export default class MyJobs extends Component {

    state = {}

    componentDidMount() {
        this.setState({...this.props.state})
    }

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