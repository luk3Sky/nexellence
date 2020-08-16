const express = require('express');
const router = express.Router();
const courses = require('../controllers/courses');
const enrollments = require('../controllers/enrollments');

/**
 * @route   GET /courses
 * @desc    Get all courses
 * @access  Public
 */
router.get('/', courses.findAll);

/**
 * @route   GET /courses/:id
 * @desc    Get a course by id
 * @access  Public
 */
router.get('/:id', courses.findById);

/**
 * @route   GET /courses/:id/enrollments
 * @desc    Get enrollments by course
 * @access  Public
 */
router.get('/:id/enrollments', enrollments.findByCourse);

/**
 * @route   POST /courses
 * @desc    Create a course
 * @access  Public
 */
router.post('/', courses.createItem);

/**
 * @route   PUT /courses
 * @desc    Update a course
 * @access  Public
 */
router.put('/', courses.updateItem);

/**
 * @route   DELETE /courses/:id
 * @desc    Delete a course
 * @access  Public
 */
router.delete('/:id', courses.deleteItem);

module.exports = router;
