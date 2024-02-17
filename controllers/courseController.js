const ErrorResponse = require("../utils/errorResponse");

const Courses = require("../models/Course");

// @desc      Get all courses
// @route     GET /api/v1/courses
// @access    Public
exports.getcourses = async (req, res, next) => {
  try {
    const courses = await Courses.find();

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    // console.error(error);
    // res.status(400).json({
    //   success: false,
    // });
    next(error);
  }
};

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getcourse = async (req, res, next) => {
  try {
    const courses = await Courses.findById(req.params.id);
    if (!courses) {
      next(
        new ErrorResponse(`Course Not found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    // console.error(error);

    // res.status(400).json({
    //   success: false,
    // });
    next(error);
  }
};

// @desc      Create new course
// @route     POST /api/v1/courses
// @access    Private
exports.createcourse = async (req, res, next) => {
  try {
    const courses = await Courses.create(req.body);

    res.status(201).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    // console.error(error);
    // res.status(400).json({
    //   success: false,
    // });
    next(error);
  }
};
// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updatecourse = async (req, res, next) => {
  try {
    const courses = await Courses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!courses) {
      return next(
        new ErrorResponse(`Course Not found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    // console.error(error);
    next(error);
  }
};

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deletecourse = async (req, res, next) => {
  try {
    const courses = await Courses.findByIdAndDelete(req.params.id);

    if (!courses) {
      return next(
        new ErrorResponse(`Course Not found with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // console.error(error);

    next(error);
  }
};
