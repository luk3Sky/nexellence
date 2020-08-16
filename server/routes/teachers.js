const express = require('express');
const router = express.Router();
const courses = require('../controllers/courses');
const teachers = require('../controllers/teachers');

/**
 * @route   GET /teachers
 * @desc    Get all teachers
 * @access  Public
 */
router.get('/', teachers.findAll);

/**
 * @route   GET /teachers/:id
 * @desc    Get a teacher by id
 * @access  Public
 */
router.get('/:id', teachers.findById);

/**
 * @route   GET /teachers/:id/courses
 * @desc    Get courses by teacher
 * @access  Public
 */
router.get('/:id/courses', courses.findByTeacher);

/**
 * @route   POST /teachers
 * @desc    Create a teacher
 * @access  Public
 */
router.post('/', teachers.createItem);

/**
 * @route   PUT /teachers
 * @desc    Update a teacher
 * @access  Public
 */
router.put('/', teachers.updateItem);

/**
 * @route   DELETE /teachers/:id
 * @desc    Delete a teacher
 * @access  Public
 */
router.delete('/:id', teachers.deleteItem);

module.exports = router;
