//HTML
const btn = document.querySelector('#submit-btn')
const inputName = document.querySelector('#name')
const inputDescription = document.querySelector('#description')
const inputTime = document.querySelector('#time')
const formAlert = document.querySelector('.form-alert')
const result = document.querySelector('.result');

const fetchTasks = async() => {
  try {
    const {data} = (await axios.get('/api/tasks'))
    console.log(data) 

    const tasks = data.data.map((task) => {
      return `<div class="task-item" id="task-${task.id}">
        <div>
          <input onclick="changeColor(${task.id})" type="checkbox" class="completed-checkbox" id="checkbox-${task.id}" name="completed${task.id}">
          <label for="completed${task.id}">Complete?</label>
        </div>
        <h3>${task.name}</h3>
        <h5>${task.description}</h5>
        <h5>- ${task.time}</h5>
        <div>
          <button onclick="editPage(${task.id})">Edit*</button>
          <button onclick="deleteItem(${task.id})">Delete</button>
        </div>
      </div>`
    })
    result.innerHTML = tasks.join('')
  } catch (err) {
    // console.log(err.response);
    formAlert.textContent = err.response.data.msg
  }
}
fetchTasks()

function editPage(taskID){
  sessionStorage.setItem('taskNumber', taskID);
  location.href='./create-panel.html'
}

function changeColor(checkValue) {
  if(document.getElementById(`checkbox-${checkValue}`).checked){
    document.getElementById(`task-${checkValue}`).classList.add('checked')
  }else{
    document.getElementById(`task-${checkValue}`).classList.remove('checked')
  }
}

if(window.location.pathname == '/create-panel.html'){
  btn.addEventListener('click', async (e) => {
    e.preventDefault()
    const [nameValue, descriptionValue, timeValue] = [inputName, inputDescription, inputTime]
  
    try {
      if(Number(sessionStorage.getItem('taskNumber')) > 0){
        const [newName, newDescription, newTime] = [inputName, inputDescription, inputTime];
        await fetch(`/api/tasks/${sessionStorage.getItem('taskNumber')}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name: newName.value, description: newDescription.value, time: newTime.value})
        })
        fetchTasks()
      } else {
        const {data} = await axios.post('/api/tasks', {name: nameValue.value, description: descriptionValue.value, time: timeValue.value})
        const h5 = document.createElement('h5')
        h5.textContent = data.task
        result.appendChild(h5)
      }
      fetchTasks()
    } catch (err) {
      console.log(err)
      formAlert.textContent = err.response.data.msg
    }
  })
}


var currentID = '';

function changeItem(item, name){
  inputName.value = name
  currentID = item
}

function deleteItem(item){
  fetch(`/api/tasks/${item}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  fetchTasks()
}