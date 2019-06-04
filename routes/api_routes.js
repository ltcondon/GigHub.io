const router = require("express").Router();
const jobController = require("../backend/controllers/jobController");
const contactController = require("../backend/controllers/contactController");

router.route("/jobs")
 .get(jobController.findAll)
 .post(jobController.create);

router.route("/jobs/:id")
 .get(jobController.findAllUserJobs);

router.route("/activejobs/:id") 
  .get(jobController.findAllActiveJobs);

router.route("/api/jobs/archive/:id") 
  .post(jobController.archiveUserJob);

router.route("/contacts")
 .get(contactController.findAll)
 .post(contactController.create);

router.route("/contacts/:id")
 .get(contactController.findAllUserContacts); 

router.route("/contacts/delete/:id") 
  .delete(contactController.deleteUserContact);

module.exports = router;