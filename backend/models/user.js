var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  linkedInId: {type: String, unique: true},
  email: String,
  image: String,
  firstName: String,
  lastName: String,
  jobs: {
  	type: Schema.Types.ObjectId,
  	ref: "Job"
  },
   createdAt: {type: Date, default: Date.now}
  }, 
  {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;
