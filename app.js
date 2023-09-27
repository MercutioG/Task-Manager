const express = require('express');
const app = express();

const port = 5000;

const tasks = require('./routes/controller');

// Static
app.use(express.static('./public'))
// Parse Data
app.use(express.urlencoded({ extended: false }))
// Parse JSON Data
app.use(express.json())
// Routers
app.use('/api/tasks', tasks)

const initServer = async () => {
  try {
    app.listen(port, () => {
      console.log('Listening on port ' + port)
    })
  } catch (error) {
    console.log(error)
  }
}

initServer()