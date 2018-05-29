const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const dockerode = require('dockerode')

const app = express()
const server = http.Server(app)
const io = socketio(server)
const docker = new dockerode({
  socketPath: '/var/run/docker.sock'
})

const port = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(port, () => console.log(`Server started on port ${port}`))

io.on('connection', (socket) => {
  socket.on('containers.list', () => {
    refreshContainers()
  })
  socket.on('container.start', (args) => {
    const {id} = args
    const container = docker.getContainer(id)
    if (container) {
      container.start((err, data) => {
        refreshContainers()
      })
    }
  })
  socket.on('container.stop', (args) => {
    const {id} = args
    const container = docker.getContainer(id)
    if (container) {
      container.stop((err, data) => {
        refreshContainers()
      })
    }
  })
})

const refreshContainers = () => {
  docker.listContainers({all: true}, (err, containers) => {
    io.emit('containers.list', containers)
  })
}
