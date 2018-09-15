const express = require('express')
const { Client } = require('pg')

const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(function (req, res, next) {
  if (req.method !== 'GET' && req.header('Content-Type') !== 'application/json') {
    res.status(400).json({ message: 'Bad Content-Type, must be application/json' })
  } else {
    next()
  }
})
app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Bad JSON', error })
  } else {
    next()
  }
});

async function query (...args) {
  if (process.env['ENV'] === 'production') {
    var client = new Client()
  } else {
    var client = new Client({
      user: 'grahamp',
      host: 'localhost',
      database: 'grahamp',
      password: '',
      port: 5432
    })
  }
  await client.connect()
  const res = await client.query(...args)
  await client.end()
  return res
}

app.get('/', (req, res) => {
  query(`
    SELECT *
    FROM saves
    ORDER BY id
    DESC LIMIT 1;
  `).then((response) => {
    res.json(response.rows[0])
  }).catch(() => {
    res.status(500).json({ message: 'DB did something weird' })
  })
})

app.post('/', (req, res) => {
  const data = JSON.stringify(req.body)
  query(`
    INSERT INTO saves (data)
    VALUES ('${data}')
    RETURNING id;
  `).then((response) => {
    res.json({ id: response.rows[0].id })
  }).catch(() => {
    res.status(500).json({ message: 'DB did something weird' })
  })
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))