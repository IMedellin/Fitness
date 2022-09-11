const express = require('express')
const app = express();
const port = process.env.PORT || 5000
const pool = require("./pool")


app.use(express.json())
app.use(express.static('public'))


//Get all users
app.get('/users', async (req, res) => {
  const getAll = await pool.query("SELECT * FROM users")
    .then(data => {
      data.rows.push('Get works with promise')
      res.send(data.rows)
    })
})

//Get one user general information
app.get('/users/username', async (req, res) => {
  const getOne = await pool.query("SELECT * FROM users WHERE ")
})





app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})