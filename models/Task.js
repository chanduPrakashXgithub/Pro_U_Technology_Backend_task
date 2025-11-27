const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', default: null },
    dueDate: { type: Date, default: null },
}, { timestamps: true });


module.exports = mongoose.model('Task', TaskSchema);