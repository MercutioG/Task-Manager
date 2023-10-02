let {tasks} = require('../data')
console.log(tasks)

//Get function for all tasks
const readTask = (req, res) => {
  res.json({success: true, data: tasks})
}

//Post function for creating tasks
const createTask = (req, res) => {
  console.log(req.body)
  const {name} = req.body
  if(!name){
    return res.status(400).json({data:[], success: false, msg:'Mising Details'})
  }
  let task = {id: length++, name:name}
  tasks.push(task)
  res.status(201).json({success: true, data: [tasks]})
}

// //PUT function for updating tasks
// let length = tasks.length + 1
// const updateTask = (req, res) => {
//   const {id} = req.params;
//   const {name} = req.body;
//   const task = tasks.find((task) => task.id === Number(id))

//   if(!task){
//     return res.json({success: false, data:[]})
//   }

//   const newTask = tasks.map((task) => {
//     if(task.id === Number(id)){
//       task.name = name;
//     }
//     return task;
//   })
//   res.status(202).json({data: newTask, success: true})
// }

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

// module.exports = {createTask, readTask, updateTask, deleteTask}
module.exports = {readTask, deleteTask}