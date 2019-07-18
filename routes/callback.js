var express = require('express');
var router = express.Router();
const request = require('superagent');
require('dotenv').config()
const db = require("../backend/models");

/* GET users listing. */

router.get("/", function(req, res, next) {
  requestAccessToken(req.query.code, req.query.state)
  .then((response) => {
    requestProfile(response.body.access_token)
    .then(response => {
      console.log(response.body)
      res.render("callback", {profile: response.body});

      var responseObj = {
          linkedInId: response.body.id,
          image: response.body.profilePicture["displayImage~"].elements[3].identifiers[0].identifier,
          firstName: response.body.firstName.localized.en_US,
          lastName: response.body.lastName.localized.en_US
        }
      db.User.findOne({ linkedInId : response.body.id}).select("linkedInId").lean().then(result => {
        if (result) {
          return;
        } else {
          db.User.create(responseObj);
        }
      })
    })
  })
  .catch((error) => {
    res.send(`${error}`)
  })
});


function requestAccessToken(code,state) {
  return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=https://gighub-io.herokuapp.com/callback`)
    .send(`client_id=7845x4f4bdc30m`)
    .send(`client_secret=oA9WHipzKzzImtNy`)
    .send(`code=${code}`)
    .send(`state=${state}`)
}

function requestProfile(token) {
  return request.get('https://api.linkedin.com/v2/me?projection=(id,firstName,lastName,profilePicture(displayImage~:playableStreams))')
  .set('Authorization', `Bearer ${token}`)
}

module.exports = router;