import express from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import fs from 'fs'

import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import api from './router/api'

const app = express()
const server = createServer(app)
const io = new Server(server)

const KEY = fs.readFileSync('../resources/private.key').toString('utf8')

io.on('connection', socketHandler)

function socketHandler (socket: Socket) {
  if (socket.handshake.headers['authorization']) {
    const { authorization: token } = socket.handshake.headers

    jwt.verify(token, KEY, (err: VerifyErrors | null) => {
      if (err) return socket.disconnect()
    })
  } else {
    socket.disconnect()
  }
}

app.use(express.static('../resources/static'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(api)

server.listen(8080)
