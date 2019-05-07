const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
  // _id: Number,
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: {type: String, default: 'In Progress' },
  milestone: {type: String, default: 'Applied'},
  createdAt: {type: Date, default: Date.now},
  hired: {type: Boolean, default: false},
  userID: {type: String, required: true }
});

module.exports = mongoose.model('Job', JobSchema);