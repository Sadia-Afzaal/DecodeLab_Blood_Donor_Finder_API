const { BLOOD_GROUPS, CONTACT_REGEX } = require('../config/constants');
const ApiError = require('../utils/ApiError');

function validateDonorPayload(req, res, next) {
  const { name, bloodGroup, city, contact } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('name is required and must be a non-empty string');
  }

  if (!bloodGroup || !BLOOD_GROUPS.includes(bloodGroup)) {
    errors.push(`bloodGroup must be one of: ${BLOOD_GROUPS.join(', ')}`);
  }

  if (!city || typeof city !== 'string' || !city.trim()) {
    errors.push('city is required and must be a non-empty string');
  }

  if (!contact || !CONTACT_REGEX.test(contact)) {
    errors.push('contact must be a valid Pakistani mobile number, e.g. 03001234567');
  }

  if (errors.length > 0) {
    return next(new ApiError(400, errors.join('; ')));
  }

  next();
}

module.exports = validateDonorPayload;
