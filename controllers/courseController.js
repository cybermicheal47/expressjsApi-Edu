const ErrorResponse = require("../utils/errorResponse");

const Courses = require("../models/Course");
const path = require("path");
const Courselisting = require("../models/Courselisting");

// @desc      Get all courses
// @route     GET /api/v1/courses
// @access    Public
exports.getcourses = async (req, res, next) => {
  try {
    res.status(200).json(res.AdvanceResults);
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

// @desc      Upload File
// @route     DELETE /api/v1/courses/:id/photo
// @access    Private
exports.UploadCourseImage = async (req, res, next) => {
  try {
    const courses = await Courses.findById(req.params.id);

    if (!courses) {
      return next(
        new ErrorResponse(`Course Not found with the id ${req.params.id}`, 404)
      );
    }

    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
    console.log(req.files);

    const file = req.files.file;
    //make sure the image is a photo

    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse(`Please upload an Image`, 400));
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `kindly upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }

    //create custom file name

    file.name = `photo_${courses._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.log(err);
        return next(new ErrorResponse(`Problem with file upload `, 500));
      }

      await Courses.findByIdAndUpdate(req.params.id, { photo: file.name });

      res.status(200).json({
        success: true,
        data: file.name,
      });
    });

    console.log(file.name);
  } catch (error) {
    // console.error(error);

    next(error);
  }
};
