const db = require("../models");
console.log("***", Object.keys(db));

module.exports = {
  findAll: function(req, res) {
    // db.Job
    //   // .find(req.query)
    //   // .sort({ date: -1 })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
    res.send("LOL");
  },

  create: function(req, res) {
    db.Job
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllUserJobs: function(req, res) {
    db.Job
      .find({ userID: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    // res.send("LOL") 
  },

  findAllActiveJobs: function(req, res) {
    db.Job
      .find({ userID: req.params.id } && { status: "In Progress"})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    // res.send("LOL") 
  },

  deleteUserJob: function(req, res) {
    db.Job
    .findByIdAndDelete({ _id: req.params.id })
    .catch(err => res.status(422).json(err));
  }
};