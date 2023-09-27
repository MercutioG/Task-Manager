const express = require('express')
const router = express.Router()

// const {createTask, readTask, updateTask, deleteTask} = require('../controllers/tasks')
const {createTask, readTask} = require('../controllers/tasks')

router.get('/', readTask)
router.post('/', createTask)
// router.put('/:id', updateTask)
// router.delete('/:id', deleteTask)

module.exports = router