const db = require("../models");
console.log("***", Object.keys(db));

module.exports = {

  create: function(req, res) {
    db.Job
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updateUserJob: function(req, res) {
    db.Job
      .findByIdAndUpdate({_id: req.params.id }, {$set: req.body})
      .catch(err => res.status(422).json(err));
  },

  findJobsByMilestone: function(req, res) {
    db.Job
      .find({
        userID: req.params.id,
        milestone: req.body
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllUserJobs: function(req, res) {
    db.Job
      .find({ userID: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  getJobsByDate: function(req, res) {
    db.Job
      .find({ userID: req.params.id, createdAt: req.body, milestone: {$ne: "Interested"}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllActiveUserJobs: function(req, res) {
    db.Job
      .find({ userID: req.params.id, status: "In Progress" })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  archiveUserJob: function(req, res) {
    db.Job
    .findByIdAndUpdate({ _id: req.params.id }, {$set: {status: "Archived"}})
    .catch(err => res.status(422).json(err));
  }
};