const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');


// Create task (protected)
router.post('/', auth.protect, [
    body('title').notEmpty().withMessage('Title is required')
], taskController.createTask);


// Update task (protected)
router.put('/:id', auth.protect, taskController.updateTask);


// Get single task (public)
router.get('/:id', taskController.getTask);


// List tasks (public) - filter by ?status=In%20Progress or ?assignee=<id>
router.get('/', taskController.listTasks);


// Delete (protected)
router.delete('/:id', auth.protect, taskController.deleteTask);


module.exports = router;