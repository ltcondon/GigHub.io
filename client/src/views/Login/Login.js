import "./LoginStyle.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

// Import required components
import BgPattern from '../../components/BgPattern';
import Alert from "react-s-alert";
// import ProfileCard from "../../components/ProfileCard";
import Nav from '../../components/Nav';
import LandingFooter from '../../components/LandingFooter';
import Fab from '@material-ui/core/Fab';


// Login/landing page keeps track of user authentication state as well as user data pulled from the LinkedIn API
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      email: null,
      pictureURL: null,
      location: null,
      id:null
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      debugger;
      this.updateProfile(event.data.profile);
      // this.updateEmail(event.data.email);
      Alert.success(`Login successful: ${event.data.profile.firstName.localized.en_US}`,{position:'top'});
    }
  };

  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: profile.firstName.localized.en_US,
        lastName: profile.lastName.localized.en_US,
        id: profile.id,
        pictureURL: profile.profilePicture["displayImage~"].elements[3].identifiers[0].identifier
        // headline: profile.headline.localized[`${profile.headline.preferredLocale.language}_${profile.headline.preferredLocale.country}`],
        // profileUrl: `https://www.linkedin.com/in/${profile.vanityName}`,
        // summary: profile.summary.localized[`${profile.summary.preferredLocale.language}_${profile.summary.preferredLocale.country}`].rawText
      })
  }

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_liteprofile%20r_emailaddress%20w_member_social&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`

    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {

    // Function checks state of component, and will redirect user to their dashboard if LinkedIn auth is successful and simultaneously pass down user info as props to our dashboard
    if (this.state.isAuthorized) {
        return <Redirect to={{
          pathname: '/dashboard', 
          state: {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            pictureURL: this.state.pictureURL
          }
        }}
        
         />
    }

    return ( 
      <div className="Landing">
        <BgPattern />
        <Nav /> 
        
        <div className="App-body">
          <Fab variant="extended" aria-label="Delete" onClick={this.requestProfile} color='primary'>
            <i className='fab fa-linkedin' color='primary'/>
              <span className='login-text'>
              Sign-in With LinkedIn
              </span>
          </Fab>
          <LandingFooter />
          {/* {this.state.isAuthorized &&
            (
              <ProfileCard
                firstName={this.state.firstName}
                // headline={this.state.headline}
                lastName={this.state.lastName}
                id={this.state.id}
                // profileURL={this.state.profileURL}
                pictureURL={this.state.pictureURL}
                // location={this.state.location}
                // positions={this.state.positions}
                // summary={this.state.summary}
                // connectionsCount={this.state.connectionsCount}
              />
            )} */}
        </div>
      </div>
    );
  }
}

export default Login;