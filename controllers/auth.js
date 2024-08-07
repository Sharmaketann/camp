const ErrorResponse = require("../utils/errorResponse")
const User = require("../models/User")
const asyncHandler = require("../middleware/async")

//@desc Register user
//@route POST /api/v1/auth/register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body

  const user = await User.create({
    name,
    email,
    password,
    role,
  })
  //Create token
  const token = user.getSignedJwtToken()
  res.status(201).json({
    success: true,
    data: user,
    token,
  })
})
