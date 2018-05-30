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
  socket.on('containers.list', async () => {
    refreshContainers()
  })
  socket.on('container.start', async (args) => {
    const {id} = args
    const container = docker.getContainer(id)
    if (container) {
      try {
        await container.start()
        refreshContainers()
      } catch (e) {
        emitError(e)
      }
    }
  })
  socket.on('container.stop', async (args) => {
    const {id} = args
    const container = docker.getContainer(id)
    if (container) {
      try {
        await container.stop()
        refreshContainers()
      }
      catch (e) {
        emitError(e)
      }
    }
  })
  socket.on('container.remove', async (args) => {
    const {id} = args
    const container = docker.getContainer(id)
    if (container) {
      try {
        const info = await container.inspect()
        if (info.State.Status === 'running') {
          await container.stop()
        }
        await container.remove()
        refreshContainers()
      } catch (e) {
        emitError(e)
      }
    }
  })
  socket.on('image.run', async (args) => {
    const {name} = args
    try {
      const container = await docker.createContainer({Image: name})
      await container.start()
      refreshContainers()
    } catch (e) {
      emitError(e)
    }
  })

  const emitError = (err) => {
    socket.emit('image.error', {message: err})
  }
})

const refreshContainers = async () => {
  try {
    const containers = await docker.listContainers({all: true})
    io.emit('containers.list', containers)
  } catch (e) {
    emitError(e)
  }
}

setInterval(refreshContainers, 5000)
