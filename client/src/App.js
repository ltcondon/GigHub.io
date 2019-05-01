import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";

import Alert from "react-s-alert";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import ProfileCard from "./components/ProfileCard";

// var IN = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      email: null,
      // profileURL: null,
      pictureURL: null,
      location: null,
      id:null
      // positions: null,
      // summary: null
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

  // updateEmail = (email) => {
  //   console.log(email);
  //   this.setState({
  //     email: email.elements[0]["handle~"].emailAddress
  //   })
  // }

  requestProfile = () => {
    // var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&scope=r_basicprofile%20r_emailaddress%20w_member_social&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Linkedin Login</h1>
          <p className="App-intro">A demo page for Linkedin login</p>
          <FontAwesomeIcon icon={["fab", "github"]} />{" "}
          <a
            href="https://github.com/tonyxu-io/React-Linkedin-Login"
            className="github-link"
          >
            tonyxu-io/React-Linkedin-Login
          </a>
          <Alert />
        </header>
        <div className="App-body">
          <button onClick={this.requestProfile}>Linkedin Login</button>
          {this.state.isAuthorized &&
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
            )}
        </div>
      </div>
    );
  }
}

export default App;