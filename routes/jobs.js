const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  postCreateJob,
  patchUpdateJob,
  deleteJob,
} = require("../controllers/jobs");

router.route("/").post(postCreateJob).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(patchUpdateJob);

module.exports = router;
