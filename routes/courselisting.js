const express = require("express");
const {
  getCourselistings,
  getSingleCourselisted,
  addSingleCourselisted,
  updateSingleCourselisted,
  deleteSingleCourselisted,
} = require("../controllers/courselistingController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourselistings).post(addSingleCourselisted);

router
  .route("/:id")
  .get(getSingleCourselisted)
  .put(updateSingleCourselisted)
  .delete(deleteSingleCourselisted);

module.exports = router;
