const express = require("express");
const {
  getcourses,
  getcourse,
  createcourse,
  updatecourse,
  deletecourse,
} = require("../controllers/courseController");

const courselistingRouter = require("./courselisting");

const router = express.Router();

//re-router into other resource router
router.use("/:courseId/courselisting", courselistingRouter);

router.route("/").get(getcourses).post(createcourse);

router.route("/:id").get(getcourse).put(updatecourse).delete(deletecourse);

module.exports = router;
