const ApiError = require('../utils/ApiError');

function validateAvailability(req, res, next) {
  const { available } = req.body;

  if (typeof available !== 'boolean') {
    return next(new ApiError(400, 'available is required and must be true or false'));
  }

  next();
}

module.exports = validateAvailability;
