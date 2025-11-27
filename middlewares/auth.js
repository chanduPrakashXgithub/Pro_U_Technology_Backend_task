const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');


exports.protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' });


        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const employee = await Employee.findById(decoded.id).select('-password');
        if (!employee) return res.status(401).json({ message: 'Invalid token' });


        req.user = employee;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized', error: err.message });
    }
};