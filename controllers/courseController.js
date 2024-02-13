// @desc      Get all courses
// @route     GET /api/v1/courses
// @access    Public
exports.getcourses = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all courses" });
};

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getcourse = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show course ${req.params.id}` });
};

// @desc      Create new course
// @route     POST /api/v1/courses
// @access    Private
exports.createcourse = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Create new course" });
};

// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updatecourse = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update course ${req.params.id}` });
};

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deletecourse = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete course ${req.params.id}` });
};
