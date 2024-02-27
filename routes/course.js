const express = require("express");
const {
  getcourses,
  getcourse,
  createcourse,
  updatecourse,
  deletecourse,
  UploadCourseImage,
} = require("../controllers/courseController");

const courselistingRouter = require("./courselisting");
const Coursemodel = require("../models/Course");
const AdvanceResults = require("../middleware/advancedResults");

const router = express.Router();

//re-router into other resource router
router.use("/:courseId/courselisting", courselistingRouter);

router.route("/:id/photo").put(UploadCourseImage);
router
  .route("/")
  .get(AdvanceResults(Coursemodel, "courses"), getcourses)
  .post(createcourse);

router.route("/:id").get(getcourse).put(updatecourse).delete(deletecourse);

module.exports = router;
