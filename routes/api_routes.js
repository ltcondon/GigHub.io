const router = require("express").Router();
const jobController = require("../backend/controllers/jobController");
const contactController = require("../backend/controllers/contactController");


router.route("/jobs/update/:id")
  .put(jobController.updateUserJob);

router.route("/jobs")
  .post(jobController.create);

router.route("/jobs/:id")
  .get(jobController.findAllUserJobs)

router.route("/jobs/bydate:id")
  .get(jobController.getJobsByDate)

router.route("/jobs/active/:id")
  .get(jobController.findAllActiveUserJobs)

router.route("/jobs/delete/:id")
  .put(jobController.archiveUserJob);

router.route("/jobs/milestone/:id")
  .get(jobController.findJobsByMilestone);

router.route("/contacts")
  .get(contactController.findAll)
  .post(contactController.create);

router.route("/contacts/:id")
  .get(contactController.findAllUserContacts); 

router.route("/contacts/update/:id")
  .put(contactController.updateUserContact);

router.route("/contacts/delete/:id") 
  .delete(contactController.deleteUserContact);

module.exports = router;