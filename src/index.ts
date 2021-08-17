import express from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import fs from 'fs'

import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

import api from './router/api'
import { db } from './global'

const app = express()
const server = createServer(app)
const io = new Server({ cors: { origin: "*" } })

const KEY = fs.readFileSync('../resources/private.key').toString('utf8')

io.on('connection', socketHandler)

function socketHandler (socket: Socket) {
  if (socket.handshake.query.token && socket.handshake.query.room) {
    const { token, groupId } = socket.handshake.query
    jwt.verify(token as string, KEY, (err: VerifyErrors | null, decoded: object | undefined) => {
      if (!decoded) return socket.disconnect()
      if (err) return socket.disconnect()
      db('members')
        .where({ groupId, userId: (decoded as { id: string }).id })
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
