const express = require("express");
const {
  getCourselistings,
  getSingleCourselisted,
  addSingleCourselisted,
  updateSingleCourselisted,
  deleteSingleCourselisted,
} = require("../controllers/courselistingController");
const Courselistingmodel = require("../models/Courselisting");
const AdvanceResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    AdvanceResults(Courselistingmodel, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourselistings
  )
  .post(addSingleCourselisted);

router
  .route("/:id")
  .get(getSingleCourselisted)
  .put(updateSingleCourselisted)
  .delete(deleteSingleCourselisted);

module.exports = router;
