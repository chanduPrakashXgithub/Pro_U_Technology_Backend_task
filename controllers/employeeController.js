const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.createEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


        const { name, role, email, password } = req.body;


        let existing = await Employee.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already exists' });


        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);


        const employee = new Employee({ name, role, email, password: hashed });
        await employee.save();


        // Create JWT token for convenience
        const token = jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });


        res.status(201).json({ employee: { id: employee._id, name: employee.name, role: employee.role, email: employee.email }, token });
    } catch (err) {
        next(err);
    }
};


exports.listEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().select('-password').sort({ createdAt: -1 });
        res.json({ employees });
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) return res.status(401).json({ message: 'Invalid credentials' });


        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });


        const token = jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};