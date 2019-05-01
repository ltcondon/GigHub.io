var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  linkedInId: {type: String, unique: true},
  email: String,
  image: String,
  firstName: String,
  lastName: String,
  createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;
