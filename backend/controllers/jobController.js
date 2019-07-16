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
      .findOneAndUpdate({_id: req.params.id }, {$set: req.body})
      .catch(err => res.status(422).json(err));
  },

  findAllUserJobs: function(req, res) {
    db.Job
      .find({ userID: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  deleteUserJob: function(req, res) {
    db.Job
    .findByIdAndDelete({ _id: req.params.id })
    .catch(err => res.status(422).json(err));
  }
};