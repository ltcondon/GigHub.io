const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  // _id: Number,
  fullName: { type: String, required: true },
  company: { type: String, required: false },
  email: {type: String, required: false},
  linkedin: {type: String,  required: false},
  phone: {type: String,  required: false},
  relationship: {type: String,  required: false},
  createdAt: {type: Date, default: Date.now},
  userID: {type: String, required: true }
});

module.exports = mongoose.model('Contact', ContactSchema);