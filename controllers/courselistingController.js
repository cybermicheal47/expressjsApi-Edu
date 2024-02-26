const ErrorResponse = require("../utils/errorResponse");

const Courselisting = require("../models/Courselisting");
const Course = require("../models/Course");

// @desc      Get all courselisting
// @route     GET /api/v1/courselisting
// @route     GET /api/v1/courses/:coursesId/courselisting
// @access    Public

exports.getCourselistings = async (req, res, next) => {
  try {
    let query;
    if (req.params.courseId) {
      query = Courselisting.find({ bootcamp: req.params.courseId }); // Assuming bootcamp is the field that stores the course ID
    } else {
      query = Courselisting.find().populate({
        path: "bootcamp",
        select: "name description",
      });
    }

    const courselisting = await query;

    if (!courselisting) {
      return res.status(404).json({
        success: false,
        error: "No course listings found",
      });
    }

    res.status(200).json({
      success: true,
      count: courselisting.length,
      data: courselisting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc      Get a single courselisted
// @route     GET /api/v1/courselistid/:id
// @access    Public

exports.getSingleCourselisted = async (req, res, next) => {
  try {
    const SingleCourselisted = await Courselisting.findById(
      req.params.id
    ).populate({
      path: "bootcamp",
      select: "name description",
    });
    if (!SingleCourselisted) {
      return next(
        new ErrorResponse(
          `Courselisted Not found with the id ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      data: SingleCourselisted,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc      Get a single courselisted
// @route     POST /api/v1/course/:courseid/courselisting
// @access    Private

exports.addSingleCourselisted = async (req, res, next) => {
  try {
    req.body.bootcamp = req.params.courseId;
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return next(
        new ErrorResponse(
          `Course Not found with the id ${req.params.courseId}`,
          404
        )
      );
    }

    const singlecourselisted = await Courselisting.create(req.body);

    res.status(200).json({
      success: true,
      data: singlecourselisted,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Update a single courselisted
// @route     POST /api/v1/courselisting/:id
// @access    Private

exports.updateSingleCourselisted = async (req, res, next) => {
  try {
    const course = await Courselisting.findById(req.params.id);

    if (!course) {
      return next(
        new ErrorResponse(
          `subcourse Not found with the id ${req.params.id}`,
          404
        )
      );
    }

    const updatedSubcourse = await Courselisting.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedSubcourse,
    });
  } catch (error) {
    next(error);
  }
};

// @desc      Delete a single courselisted
// @route     Delete /api/v1/courselisting/:id
// @access    Private
exports.deleteSingleCourselisted = async (req, res, next) => {
  try {
    const subcourseId = req.params.id;

    // Check if the subcourse exists
    const subcourse = await Courselisting.findById(subcourseId);
    if (!subcourse) {
      return next(
        new ErrorResponse(`Subcourse not found with the id ${subcourseId}`, 404)
      );
    }

    // Delete the subcourse
    await Courselisting.findByIdAndDelete(subcourseId);

    res.status(200).json({
      success: true,
      data: {}, // No data to return after deletion
    });
  } catch (error) {
    next(error);
  }
};
