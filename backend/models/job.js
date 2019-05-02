const mongoose = require('mongoose');
const { Schema } = mongoose;

const JobSchema = new Schema({
  // _id: Number,
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: [{
    position: {type: String},
    updatedAt: {type: Date, default: Date.now},
  }],
  createdAt: {type: Date, default: Date.now},
  hired: {type: Boolean, default: false}
});

module.exports = mongoose.model('Job', JobSchema);