const express = require("express")
const router = express.Router();
const taskController = require('../controller/task')
const {authMiddleware} = require('../middleware/authMiddleware')
const { validate, taskValidationRules } = require("../../service/validation/user");

router.post('/tasks',authMiddleware,validate(taskValidationRules),taskController.create)
router.get('/tasks',authMiddleware, taskController.getAllTasks)
router.put('/tasks/:id',authMiddleware, taskController.update)
router.delete('/tasks/:id',authMiddleware, taskController.delete)

module.exports = router;