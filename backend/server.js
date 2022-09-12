const express = require('express')
const app = express();
const port = process.env.PORT || 5000
const pool = require("./pool")


app.use(express.json())
app.use(express.static('public'))


//Get all users
app.get('/users', async (req, res) => {
  const getAll = await pool.query("SELECT userid, username, fullname FROM users")
    .then(data => {
      res.json(data.rows)
    })
    .catch(error => {
      res.setHeader(400)
      console.error(error)
    })
})

//Get one user general information
app.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  const getOne = await pool.query("SELECT username, age, weight, height FROM users JOIN users_bmi ON users.userid = users_bmi.userid WHERE username = $1", [username])
    .then(data => {
      res.send(data.rows)
    })
    .catch(error => console.error(error))
})

//Create a new user
app.post('/users', async (req, res) => {
  const { username, fullName } = req.body;
  const postOne = await pool.query("INSERT INTO users (username, fullName) VALUES ($1, $2) RETURNING *", [username, fullName])
    .then(data => {
      console.log(data.rows)
      res.send('Posted new user')
    })
    .catch(error => console.error(error))
})

//Create user's data
app.post('/users/:username', async (req, res) => {
  const { username } = req.params
  const { age, weight, height } = req.body
  const postUserData = await pool.query("INSERT INTO users_bmi (age, weight, height) VALUES ($1, $2, $3)", [age, weight, height, username])
    .then(data => {
      console.log(data.rows)
      res.send("Created data for user")
    })
})



app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})


// const getOne = await pool.query("SELECT username, fullname, age, weight, height FROM users JOIN users_bmi ON users.userid = users_bmi.userid WHERE username = $1", [username])

// const getAll = await pool.query("SELECT username, age, weight, height FROM users JOIN users_bmi ON users.userid = users_bmi.userid")