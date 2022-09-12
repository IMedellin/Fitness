const express = require('express')
const app = express();
const port = process.env.PORT || 5000
const pool = require("./pool")


app.use(express.json())
app.use(express.static('public'))


//Get all users
app.get('/users', async (req, res) => {
  const getAll = await pool.query("SELECT username, age, weight, height FROM users JOIN users_bmi ON users.userid = users_bmi.userid")
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
  const getOne = await pool.query("SELECT username, fullname, age, weight, height FROM users JOIN users_bmi ON users.userid = users_bmi.userid WHERE username = $1", [username])
    .then(data => {
      res.send(data.rows)
    })
    .catch(error => console.error(error))
})




app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})