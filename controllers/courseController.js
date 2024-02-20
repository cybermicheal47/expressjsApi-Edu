const ErrorResponse = require("../utils/errorResponse");

const Courses = require("../models/Course");

// @desc      Get all courses
// @route     GET /api/v1/courses
// @access    Public
exports.getcourses = async (req, res, next) => {
  try {
    let query;
    // copy req.query
    const reqQuery = { ...req.query };

    //fields to exclude
    const removeFields = ["select", "sort"];

    //loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);
    console.log(reqQuery);

    //create Query String
    let querystr = JSON.stringify(reqQuery);

    //create operators like ($gt,$lt,$lte,$gte)
    querystr = querystr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    //select Fields
    let fields;
    if (req.query.select) {
      fields = req.query.select.split(",").join(" ");
      console.log(fields);
    }

    //finding and executing our query
    query = Courses.find(JSON.parse(querystr));

    // Select specific fields if 'select' query parameter is provided
    if (fields) {
      query = query.select(fields);
    }

    //sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const courses = await query;

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
