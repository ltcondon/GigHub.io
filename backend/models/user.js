var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  _id: String,
  linkedInId: {type: String, unique: true},
  email: String,
  image: String,
  firstName: String,
  lastName: String,
  createdAt: {type: Date, default: Date.now}
}, {timestamps: true});

mongoose.model('User', UserSchema);