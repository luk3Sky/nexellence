const express = require('express');
const router = express.Router();
const enrollments = require('../controllers/enrollments');

/**
 * @route   POST /enrollments
 * @desc    Create an enrollment
 * @access  Public
 */
router.post('/', enrollments.createItem);

/**
 * @route   DELETE /enrollments/:id
 * @desc    Delete an enrollment
 * @access  Public
 */
router.delete('/:id', enrollments.deleteItem);

module.exports = router;
