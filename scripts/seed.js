require('dotenv').config();
const connectDB = require('../config/db');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const Employee = require('../models/Employee');
const Task = require('../models/Task');

const seed = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);

        const raw = fs.readFileSync(path.join(__dirname, '..', 'data', 'sample-data.json'), 'utf8');
        const data = JSON.parse(raw);

        // Clear existing
        await Employee.deleteMany({});
        await Task.deleteMany({});

        // Insert employees (hash passwords)
        const createdEmployees = [];
        for (const e of data.employees || []) {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(e.password || 'password', salt);
            const emp = new Employee({ name: e.name, role: e.role, email: e.email, password: hashed });
            await emp.save();
            createdEmployees.push(emp);
        }

        // Insert tasks, linking assignee by email when provided
        for (const t of data.tasks || []) {
            let assigneeId = null;
            if (t.assigneeEmail) {
                const emp = createdEmployees.find(x => x.email === t.assigneeEmail);
                if (emp) assigneeId = emp._id;
            }
            const task = new Task({ title: t.title, description: t.description, status: t.status, assignee: assigneeId, dueDate: t.dueDate || null });
            await task.save();
        }

        console.log('Seeding complete');
        mongoose.disconnect();
    } catch (err) {
        console.error('Seed error', err);
        process.exit(1);
    }
};

seed();
