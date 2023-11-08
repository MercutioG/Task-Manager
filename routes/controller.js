const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json());
const {createTask, readTask, updateTask, deleteTask} = require('../controllers/tasks')

router.get('/', readTask)
router.post('/', createTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router