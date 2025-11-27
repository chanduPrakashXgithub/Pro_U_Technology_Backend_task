const Task = require('../models/Task');
const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');


exports.createTask = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


        const { title, description, status, assignee, dueDate } = req.body;


        // If assignee provided, ensure exists
        let assigneeId = assignee || null;
        if (assigneeId) {
            const emp = await Employee.findById(assigneeId);
            if (!emp) return res.status(404).json({ message: 'Assignee employee not found' });
        }


        const task = new Task({ title, description, status, assignee: assigneeId, dueDate });
        await task.save();


        res.status(201).json({ task });
    } catch (err) {
        next(err);
    }
};


exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const update = req.body;


        if (update.assignee) {
            const emp = await Employee.findById(update.assignee);
            if (!emp) return res.status(404).json({ message: 'Assignee employee not found' });
        }


        const task = await Task.findByIdAndUpdate(id, update, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });


        res.json({ task });
    } catch (err) {
        next(err);
    }
};


exports.getTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id).populate('assignee', '-password');
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ task });
    } catch (err) {
        next(err);
    }
};


exports.listTasks = async (req, res, next) => {
    try {
        const { status, assignee } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (assignee) filter.assignee = assignee;


        const tasks = await Task.find(filter).populate('assignee', '-password').sort({ createdAt: -1 });
        res.json({ tasks });
    } catch (err) {
        next(err);
    }
};


exports.deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        res.status(204).send();
    } catch (err) {
        next(err);
    }
};