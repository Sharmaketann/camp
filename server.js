const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const connectDB = require("./config/db")
const colors = require("colors")
const errorHandler = require("./middleware/error")

//Load env vars
dotenv.config({ path: "./config/config.env" })

//Connect to database
connectDB()

// Route files
const bootcamps = require("./routes/bootcamps")
const courses = require("./routes/courses")
const auth = require("./routes/auth")
const app = express()

// Body parser
app.use(express.json())

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

//Mount Routers
app.use("/api/v1/bootcamps", bootcamps)
app.use("/api/v1/courses", courses)
app.use("/api/v1/auth", auth)

// Error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

//Handle unhandled rejections

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  //Close server & exit process
  server.close(() => process.exit(1))
})
