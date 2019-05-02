const router = require("express").Router();
const jobController = require("../backend/controllers/jobController");

router.route("/jobs")
  .get(jobController.findAll)
  .post(jobController.create);

router
  .route("/jobs/:id")
  .delete(jobController.remove);

module.exports = router;