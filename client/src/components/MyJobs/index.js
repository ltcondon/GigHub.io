import React, { PureComponent } from 'react';
// import EnhancedTable from '../EnhancedTable/index';
// import TempJobsTable from '../TempJobsTable';
import Jobs from '../Jobs';
import Fade from 'react-reveal/Fade';

export default class MyJobs extends PureComponent {

    state = {}

    componentDidMount () {
        this.setState({...this.props.state});
      };
    
    componentDidUpdate (prevProps) {
        if (this.props.state.id !== prevProps.state.id) {
          this.setState({...this.props.state});
        }
      };
      
    render() {
        console.log("My Jobs ID: " + this.state.id)
        return (
            <div>
                <Jobs state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/>
                <Fade bottom duration={650}>    
                  {/* <EnhancedTable state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/> */}
                  {/* <TempJobsTable state={{id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, pictureURL: this.state.pictureURL, isAuthorized: this.state.isAuthorized}}/> */}
                </Fade>
            </div>
        )
    }
}