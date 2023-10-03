let {tasks} = require('../data')
console.log(tasks[tasks.length - 1].id)

//Get function for all tasks
const readTask = (req, res) => {
  res.json({success: true, data: tasks})
}

//Post function for creating tasks
var newID = tasks[tasks.length - 1].id + 1
const createTask = (req, res) => {
  console.log(req.body)
  const {name, description, time} = req.body
  if(!name || !description || !time){
    return res.status(400).json({data:[], success: false, msg:'Mising Details'})
  }
  let task = {id: newID, name:name, time:time, description:description, completed: false}
  tasks.push(task)
  res.status(201).json({success: true, data: [tasks]})
}

//PUT function for updating tasks
const updateTask = (req, res) => {
  const {id} = req.params;
  const {name, description, time} = req.body;
  const task = tasks.find((task) => task.id === Number(id))

  if(!task){
    return res.json({success: false, data:[]})
  }

  const newTask = tasks.map((task) => {
    if(task.id === Number(id)){
      task.name = name;
      task.description = description;
      task.time = time;
    }
    return task;
  })
  res.status(202).json({data: newTask, success: true})
}

//DELETE function for delete tasks
const deleteTask = (req, res) => {
  const {id} = req.params
  const task = tasks.find((task) => task.id === Number(id))
  
  if(!task){
    return res.status(404).json({success: false, msg: 'No task found'})
  }

  tasks = tasks.filter((task) => {
    return task.id !== Number(id)
  })
  res.status(202).json({data: tasks, success: true})
}

module.exports = {createTask, readTask, updateTask, deleteTask}