const express = require('express');
const router = express.Router();
const students = require('../controllers/students');
const enrollments = require('../controllers/enrollments');

/**
 * @route   GET /students
 * @desc    Get all students
 * @access  Public
 */
router.get('/', students.findAll);

/**
 * @route   GET /students/:id
 * @desc    Get a student by id
 * @access  Public
 */
router.get('/:id', students.findById);

/**
 * @route   GET /students/:id/enrollments
 * @desc    Get enrollments by student
 * @access  Public
 */
router.get('/:id/enrollments', enrollments.findByStudent);

/**
 * @route   POST /students
 * @desc    Create a student
 * @access  Public
 */
router.post('/', students.createItem);

/**
 * @route   PUT /students
 * @desc    Update a student
 * @access  Public
 */
router.put('/', students.updateItem);

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student
 * @access  Public
 */
router.delete('/:id', students.deleteItem);

module.exports = router;
