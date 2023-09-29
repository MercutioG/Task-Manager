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
      return `<div><h3>${task.name}</h3><h5>${task.description}</h5></div>`
    })
    result.innerHTML = tasks.join('')
  } catch (err) {
    // console.log(err.response);
    formAlert.textContent = err.response.data.msg
  }
}
fetchTasks()



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
  fetch(`/api/people/${item}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  })
  fetchTasks()
}