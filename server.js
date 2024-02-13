const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
// routes
const course = require("./routes/course");

// load env
dotenv.config({ path: "./config/config.env" });

const app = express();

// Dev logging  middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Mount router
app.use("/api/v1/courses", course);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
