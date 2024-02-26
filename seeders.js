const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

//load Models

const Course = require("./models/Course");
const Courselisting = require("./models/Courselisting");

//Connect to Db
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true, // Add this option for avoiding deprecation warning
});

//Read json file

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

const courselisting = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

//import to DB

const importdata = async () => {
  try {
    await Course.create(courses);
    // await Courselisting.create(courselisting);
    console.log("data imported");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

//Delete Data

const deletedata = async () => {
  try {
    await Course.deleteMany();
    await Courselisting.deleteMany();
    console.log("data Deleted");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importdata();
} else if (process.argv[2] === "-d") {
  deletedata();
}
