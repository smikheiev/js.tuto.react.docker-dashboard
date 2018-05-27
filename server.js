const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const server = http.Server(app)

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(port, () => console.log(`Server started on port ${port}`))
