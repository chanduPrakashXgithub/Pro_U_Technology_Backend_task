const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const employeeController = require('../controllers/employeeController');
const auth = require('../middlewares/auth');


// Create employee (public)
router.post('/', [
    body('name').notEmpty().withMessage('Name is required'),
    body('role').notEmpty().withMessage('Role is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
], employeeController.createEmployee);


// List employees (protected)
router.get('/', auth.protect, employeeController.listEmployees);


// Login
router.post('/login', employeeController.login);


module.exports = router;