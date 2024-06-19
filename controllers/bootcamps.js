const Bootcamp = require("../models/Bootcamp")
//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamps" })
}

//@desc GET single bootcamps
//@route GET /api/v1/bootcamps/:id
//@access Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show a bootcamp ${req.params.id}` })
}

//@desc Create new bootcamps
//@route POST /api/v1/bootcamps/
//@access Private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).json({
      success: true,
      data: bootcamp,
    })
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

//@desc Update bootcamps
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update a bootcamp ${req.params.id}` })
}

//@desc Delete bootcamps
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete a bootcamps ${req.params.id}` })
}
