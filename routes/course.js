const express = require("express");
const {
  getcourses,
  getcourse,
  createcourse,
  updatecourse,
  deletecourse,
} = require("../controllers/courseController");

const router = express.Router();

router.route("/").get(getcourses).post(createcourse);

router.route("/:id").get(getcourse).put(updatecourse).delete(deletecourse);

module.exports = router;
