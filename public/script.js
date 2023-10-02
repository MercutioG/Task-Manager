//HTML
const btn = document.querySelector('.submit-btn')
const input = document.querySelector('.form-input')
const formAlert = document.querySelector('.form-alert')
const result = document.querySelector('.result');
var editmode = false;

const fetchTasks = async() => {
  try {
    const {data} = await axios.get('/api/tasks')
    console.log(data)

    const tasks = data.data.map((task) => {
      return `<div class="task-item" id="task-${task.id}"><div><input onclick="changeColor(${task.id})" type="checkbox" class="completed-checkbox" id="checkbox-${task.id}" name="completed${task.id}"><label for="completed${task.id}">Complete?</label></div><h3>${task.name}</h3><h5>${task.description}</h5><h5>- ${task.time}</h5><div><button onclick="deleteItem(${task.id})">Delete</button></div></div>`
    })
    result.innerHTML = tasks.join('')
  } catch (err) {
    // console.log(err.response);
    formAlert.textContent = err.response.data.msg
  }
}
fetchTasks()

function changeColor(checkValue) {
  if(document.getElementById(`checkbox-${checkValue}`).checked){
    document.getElementById(`task-${checkValue}`).classList.add('checked')
  }else{
    document.getElementById(`task-${checkValue}`).classList.remove('checked')
  }
}

btn.addEventListener('click', async (e) => {
  e.preventDefault()
  const nameValue = input.value

  try {
    if(!editmode){
      const {data} = await axios.post('/api/people', {name: nameValue})
      const h5 = document.createElement('h5')
      h5.textContent = data.person
      result.appendChild(h5)
    } else {
      const newName = input.value;
      fetch(`/api/people/${currentID}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: newName})
      })
      fetchTasks()
      editmode = false;
    }
    fetchTasks()
  } catch (err) {
    console.log(err)
    formAlert.textContent = err.response.data.msg
  }
  input.value = ''
})

var currentID = '';

function changeItem(item, name){
  editmode = true
  input.value = name
  currentID = item
}

function deleteItem(item){
  fetch(`/api/tasks/${item}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  fetchTasks()
}