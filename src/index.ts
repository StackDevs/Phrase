import express from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import fs from 'fs'

import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import api from './router/api'

const app = express()
const server = createServer(app)
const io = new Server({ cors: { origin: "*" } })

const KEY = fs.readFileSync('../resources/private.key').toString('utf8')

io.on('connection', socketHandler)

function socketHandler (socket: Socket) {
  if (socket.handshake.query['token']) {
    const { token } = socket.handshake.query
    console.log('abcd')

    jwt.verify(token as string, KEY, (err: VerifyErrors | null, decoded: object | undefined) => {
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
io.listen(server)
