const donorModel = require('../models/donorModel');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { DONATION_COOLDOWN_DAYS } = require('../config/constants');

const registerDonor = asyncHandler(async (req, res) => {
  const { name, bloodGroup, city, contact } = req.body;

  const existing = donorModel.findByContact(contact);
  if (existing) {
    throw new ApiError(409, 'A donor with this contact number is already registered');
  }

  const donor = donorModel.create({ name: name.trim(), bloodGroup, city: city.trim(), contact });
  res.status(201).json({ success: true, data: donor });
});

const getDonors = asyncHandler(async (req, res) => {
  const { bloodGroup, city, availableOnly } = req.query;
  const donors = donorModel.findAll({
    bloodGroup,
    city,
    availableOnly: availableOnly === 'true'
  });

  if (donors.length === 0) {
    throw new ApiError(404, 'No matching donors found');
  }

  res.status(200).json({ success: true, count: donors.length, data: donors });
});

const getDonorById = asyncHandler(async (req, res) => {
  const donor = donorModel.findById(req.params.id);

  if (!donor) {
    throw new ApiError(404, 'Donor not found');
  }

  res.status(200).json({ success: true, data: donor });
});

const updateAvailability = asyncHandler(async (req, res) => {
  const { available } = req.body;
  const donor = donorModel.findById(req.params.id);

  if (!donor) {
    throw new ApiError(404, 'Donor not found');
  }

  if (available && donor.lastDonatedAt) {
    const daysSinceDonation = (Date.now() - new Date(donor.lastDonatedAt).getTime()) / 86400000;
    if (daysSinceDonation < DONATION_COOLDOWN_DAYS) {
      const daysLeft = Math.ceil(DONATION_COOLDOWN_DAYS - daysSinceDonation);
      throw new ApiError(400, `Donor must wait ${daysLeft} more day(s) before donating again`);
    }
  }

  const updated = donorModel.updateAvailability(req.params.id, available);
  res.status(200).json({ success: true, data: updated });
});

const deleteDonor = asyncHandler(async (req, res) => {
  const deleted = donorModel.remove(req.params.id);

  if (!deleted) {
    throw new ApiError(404, 'Donor not found');
  }

  res.status(204).send();
});

module.exports = {
  registerDonor,
  getDonors,
  getDonorById,
  updateAvailability,
  deleteDonor
};
