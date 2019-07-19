import './LoginStyle.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Scrollchor from 'react-scrollchor';

// Import required components
import BgPattern from '../../components/BgPattern';
import Alert from 'react-s-alert';
import Nav from '../../components/Nav';
import LandingFooter from '../../components/LandingFooter';
import Fab from '@material-ui/core/Fab';
import AngleJumbo from '../../components/AngleJumbo';
import AboutStepper from '../../components/AboutStepper';

// Import react-reveal methods for revealing content with animations on scroll
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';



// Inline styling that will be passed down to LinkedIn login button to override material ui styles
const style = {
  marginTop: '5%',
  marginBottom: '5%',
  bottom: '85px',
}

// Login/landing page keeps track of user authentication state as well as user data pulled from the LinkedIn API
class Login extends Component {

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
    // this.requestProfile();
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
    <div className="page-container"> 
      <div className="Landing">
        <BgPattern />

        <Nav click={this.requestProfile}/>
        <Slide top duration={1300}>
          <div> 
            <AngleJumbo className="angleJumbo"/>
          </div>
        </Slide> 

        <Fade bottom big duration={1600}>
        <div className="navbar justify-content-center down-arrow">
          <ul className="navbar-nav">
           <li className="nav-item">
            <Pulse forever duration={1650}>
             <Scrollchor to="#section-2" className="nav-link active" animate={{offset: -75, duration: 700}}>
               <svg className="arrows">
                 <path d="M0 20 L20 42 L40 20"></path>
                 <path d="M0 40 L20 62 L40 40"></path>
               </svg>
             </Scrollchor>
            </Pulse> 
            </li>
          </ul>
        </div>
        </Fade>

        <div className="App-body" id="section-2">
          <Fade duration={3500}>
            <AboutStepper />
          </Fade>

          <div className='mx-auto align-items-center btn-container'>
            <Fab variant="extended" aria-label="Delete" onClick={this.requestProfile} color='primary' className="login-btn grow" style={style}>
              <i className='fab fa-linkedin' color='primary'/>
                <span className='login-text text-capitalize'>
                Sign-in With LinkedIn
                </span>
            </Fab>
          </div>

        </div>
      </div>
      <LandingFooter />
    </div> 
    );
  }
}

export default Login;
