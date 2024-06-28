const express = require("express")
const router = express.Router()
const {
  getBootcamp,
  getBootcamps,
  updateBootcamps,
  deleteBootcamps,
  createBootcamps,
  getBootcampsInRadius,
} = require("../controllers/bootcamps")

// Include other resource routers
const courseRouter = require("./courses")

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter)

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius)

router.route("/").get(getBootcamps).post(createBootcamps)

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps)

module.exports = router
