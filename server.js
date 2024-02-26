const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const ErrorHandler = require("./middleware/error");
// routes
const course = require("./routes/course");
const courselisting = require("./routes/courselisting");
const connectDB = require("./config/db");
// load env
dotenv.config({ path: "./config/config.env" });

const app = express();

//body parser

app.use(express.json());

// Dev logging  middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// Mount router
app.use("/api/v1/courses", course);
app.use("/api/v1/courselisting", courselisting);

app.use(ErrorHandler);

//connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
