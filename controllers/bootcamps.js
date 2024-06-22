const ErrorResponse = require("../utils/errorResponse")
const Bootcamp = require("../models/Bootcamp")
const asyncHandler = require("../middleware/async")
const geocoder = require("../utils/geocoder")

//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query
  let queryString = JSON.stringify(req.query)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  )
  query = Bootcamp.find(JSON.parse(queryString))
  const bootcamps = await query
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})

//@desc GET single bootcamps
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of: ${req.params.id}`, 404)
    )
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  })
})

//@desc Create new bootcamps
//@route POST /api/v1/bootcamps/
//@access Private
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body)
  res.status(201).json({
    success: true,
    data: bootcamp,
  })
})

//@desc Update bootcamps
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of: ${req.params.id}`, 404)
    )
  }
  res.status(200).json({
    success: true,
    data: bootcamp,
  })
})

//@desc Delete bootcamps
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of: ${req.params.id}`, 404)
    )
  }
  res.status(200).json({
    success: true,
    data: {},
  })
})

//@desc Get Bootcamps within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params
  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode)
  const lat = loc[0].latitude
  const lng = loc[0].longitude
  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 6378
  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  })
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  })
})
