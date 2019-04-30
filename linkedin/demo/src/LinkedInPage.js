import React, { Component } from 'react';

import { LinkedIn } from '../../src';
// import ProfileCard from '../../src';

class LinkedInPage extends Component {
  state = {
    code: '',
    errorMessage: '',
  };


  handleSuccess = (data) => {
    this.setState({
      code: data.code,
      errorMessage: '',
    });
  }

  handleFailure = (error) => {
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }

// requestAccessToken = (code,state) => {
//   return request.post('https://www.linkedin.com/oauth/v2/accessToken')
//     .send('grant_type=authorization_code')
//     .send(`redirect_uri=${window.location.origin}/linkedin}`)
//     .send(`client_id=86p2m126j14xhw`)
//     .send(`client_secret=rf4DILg239DS42Nb`)
//     .send(`code=${code}`)
//     .send(`state=34232423`)
// }

  render() {
    const { code, errorMessage } = this.state;
    return (
      <div>
        <LinkedIn
          clientId="86p2m126j14xhw"
          redirectUri={`${window.location.origin}/linkedin`}
          scope="r_liteprofile r_emailaddress w_share"
          state="34232423"
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
        >
          <img src={require('./assets/linkedin.png')} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
        </LinkedIn>
        {!code && <div>No code</div>}
        {code && <div>Code: {code}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  }
}
// console.log(code);
export default LinkedInPage;
