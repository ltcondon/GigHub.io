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
    db.Contact
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findAllUserContacts: function(req, res) {
    db.Contact
      .find({ userID: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

    // res.send("LOL") 
  },

  updateUserContact: function(req, res) {
    db.Contact
      .findOneAndUpdate({_id: req.params.id }, {$set: req.body})
      .catch(err => res.status(422).json(err));
  },

  deleteUserContact: function(req, res) {
    db.Contact
    .findByIdAndDelete({ _id: req.params.id })
    .catch(err => res.status(422).json(err));
  }
};