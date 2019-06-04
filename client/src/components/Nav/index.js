// import React from "react";
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./style.css";
import Logo from '../Logo';

import Fade from 'react-reveal/Fade';
import Alert from 'react-s-alert';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: null,
      firstName: null,
      lastName: null,
      email: null,
      pictureURL: null,
      location: null,
      id:null
    };
  }

  // Page will listen for post message to handle authentication...
  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
    // if (this.props.location.state.isAuthorized === true) {
    //   this.setState({isAuthorized: true});
    // }
  }

  // ... and pass user auth data on to the updateProfile method
  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      debugger;
      this.updateProfile(event.data.profile);
      Alert.success(`Login successful: ${event.data.profile.firstName.localized.en_US}`,{position:'top'});
    }
  };

  // Sets state of this component to include user information from LinkedIn
  updateProfile = (profile) => {
    console.log(profile)
      this.setState({
        isAuthorized: true,
        firstName: profile.firstName.localized.en_US,
        lastName: profile.lastName.localized.en_US,
        id: profile.id,
        pictureURL: profile.profilePicture["displayImage~"].elements[3].identifiers[0].identifier
      })
  }

  // Open a sign-in window, which lets users enter sign-in info and then queries the LinkedIn API to get back an authorization token
  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7845x4f4bdc30m&scope=r_liteprofile%20r_emailaddress%20w_member_social&redirect_uri=https://gighub-io.herokuapp.com/callback`

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

    // Function checks state of component, and will redirect user to their dashboard if LinkedIn auth is successful and simultaneously pass down user info as props to the dashboard page
    if (this.state.isAuthorized) {
        return <Redirect to={{
          pathname: '/dashboard', 
          state: {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            pictureURL: this.state.pictureURL,
            isAuthorized: this.state.isAuthorized
          }
        }}  
        />
    }

  return (
    <nav className="navbar navbar-expand-lg sticky-top landingNav">
      <Link className="navbar-brand" to="/">
        <Logo />
          <Fade top duration={1650}>
            <span className="logoText">
              <span id="g">G</span>ig<span id="h">H</span>ub
            </span>
          </Fade>
      </Link>
      <div className="navLinks">
        <ul className="navbar-nav mr-3">

          <li className="nav-item">
            <a
              className="btn btn-small"
              onClick={this.requestProfile}
            >
              <i className='fab fa-linkedin' color='primary'/>
              <span className="loginText">
                Login 
              </span>
            </a>
          </li>

        </ul>
      </div>
    </nav>
  );
}
}

export default Navbar;