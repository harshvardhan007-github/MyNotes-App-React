const connectToMongo = require('./db') // importing from db.js
const express = require('express')
var cors = require('cors') // installing cors for resolving cross port webpage request errors

connectToMongo();

const app = express()
const port = 5000

app.use(cors())
// for using req.body
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`iNotebook app listening on port ${port}`)
})
