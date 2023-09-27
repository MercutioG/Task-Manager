let {tasks} = require('../data')
console.log(tasks)

//Get function for all people
const readTask = (req, res) => {
  res.json({success: true, data: tasks})
}

//Post function for creating people
const createTask = (req, res) => {
  console.log(req.body)
  const {name} = req.body
  if(!name){
    return res.status(400).json({data:[], success: false, msg:'Mising Details'})
  }
  let person = {id: length++, name:name}
  tasks.push(person)
  res.status(201).json({success: true, data: [tasks]})
}

// //PUT function for updating people
// let length = people.length + 1
// const updateTask = (req, res) => {
//   const {id} = req.params;
//   const {name} = req.body;
//   const person = people.find((person) => person.id === Number(id))

//   if(!person){
//     return res.json({success: false, data:[]})
//   }

//   const newTask = people.map((person) => {
//     if(person.id === Number(id)){
//       person.name = name;
//     }
//     return person;
//   })
//   res.status(202).json({data: newTask, success: true})
// }

// //DELETE function for delete people
// const deleteTask = (req, res) => {
//   const {id} = req.params
//   const task = people.find((task) => task.id === Number(id))
  
//   if(!task){
//     return res.status(404).json({success: false, msg: 'No person found'})
//   }

//   people = people.filter((person) => {
//     return person.id !== Number(id)
//   })
//   res.status(202).json({data: people, success: true})
// }

// module.exports = {createTask, readTask, updateTask, deleteTask}
module.exports = {createTask, readTask}