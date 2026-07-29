const express = require('express');
const donorController = require('../controllers/donorController');
const validateDonorPayload = require('../middleware/validateDonor');
const validateAvailability = require('../middleware/validateAvailability');

const router = express.Router();

router.post('/', validateDonorPayload, donorController.registerDonor);
router.get('/', donorController.getDonors);
router.get('/:id', donorController.getDonorById);
router.put('/:id/availability', validateAvailability, donorController.updateAvailability);
router.delete('/:id', donorController.deleteDonor);

module.exports = router;
