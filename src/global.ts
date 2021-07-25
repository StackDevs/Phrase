import knex from 'knex'
import { Server } from 'socket.io'

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'freechat',
    database: 'freechat'
  }
})

let io: Server

export { db, io }
