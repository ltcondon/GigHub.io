const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const JobSchema = new Schema({
  // _id: Number,
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: 'In Progress' },
  location: { type: String, required: true },
  milestone: { type: String, default: 'Applied' },
  createdAt: { type: Date, default: moment() },
  updatedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, required: false },
  hired: { type: Boolean, default: false },
  userID: { type: String, required: true }
});

module.exports = mongoose.model('Job', JobSchema);