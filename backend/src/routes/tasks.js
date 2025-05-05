const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   text:
 *                     type: string
 *                   order:
 *                     type: integer
 */
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll({
            order: [['order', 'ASC']]
        });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/', async (req, res) => {
    try {
        const lastTask = await Task.findOne({
            order: [['order', 'DESC']]
        });
        const order = lastTask ? lastTask.order + 1 : 0;
        
        const task = await Task.create({
            text: req.body.text,
            order
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.destroy();
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/tasks/reorder:
 *   post:
 *     summary: Reorder tasks
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: integer
 *               newOrder:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tasks reordered successfully
 */
router.post('/reorder', async (req, res) => {
    try {
        const { taskId, newOrder } = req.body;
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        
        await task.update({ order: newOrder });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 