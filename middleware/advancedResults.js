const AdvanceResults = (model, populate) => async (req, res, next) => {
  let query;
  // copy req.query
  const reqQuery = { ...req.query };

  //fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

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
  query = model.find(JSON.parse(querystr));

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

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);
  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.AdvanceResults = {
    success: true,

    count: results.length,
    pagination,
    data: results,
  };

  next();
};

module.exports = AdvanceResults;
