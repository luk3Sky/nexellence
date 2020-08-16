const express = require('express');
const router = express.Router();
const periods = require('../controllers/periods');

/**
 * @route   GET /periods
 * @desc    Get all periods
 * @access  Public
 */
router.get('/', periods.findAll);

module.exports = router;
