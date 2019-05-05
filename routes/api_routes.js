const router = require("express").Router();
const jobController = require("../backend/controllers/jobController");

router.route("/jobs")
 .get(jobController.findAll)
 .post(jobController.create);

router.route("/jobs/:id")
 .get(jobController.findAllUserJobs);

module.exports = router;