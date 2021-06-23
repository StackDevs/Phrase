import express from 'express'

import { createServer } from 'http'
import { Server } from 'socket.io'

import api from './router/api'

const app = express()
const server = createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  if (socket.handshake.headers['authorization']) {
    // TODO: check token
  } else {
    socket.disconnect()
  }
})

app.use(express.static('../resources/static'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(api)

server.listen(8080)
