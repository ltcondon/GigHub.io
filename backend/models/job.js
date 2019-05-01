const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
  _id: Number,
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: [{
    name: String,
    createdAt: {type: Date, default: Date.now},
  }],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, required: true, default: Date.now},
});

module.exports = mongoose.model('Job', JobSchema);