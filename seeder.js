const fs = require("fs")
const mongoose = require("mongoose")
const colors = require("colors")
const dotenv = require("dotenv")

dotenv.config({ path: "./config/config.env" })
const Bootcamp = require("./models/Bootcamp")
const Course = require("./models/Course")

//Connect to db

mongoose.connect(process.env.MONGO_URI, {})

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
)

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
)

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)
    await Course.create(courses)
    console.log("Data Imported".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany()
    await Course.deleteMany()
    console.log("Data Destroyed".red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}
if (process.argv[2] === "-i") {
  importData()
} else if (process.argv[2] === "-d") {
  deleteData()
}
module.exports = {
  importData,
  deleteData,
}
