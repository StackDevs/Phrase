import { Request, Response } from 'express'
import { sha256 } from 'js-sha256'
import { db } from '../../../global'
import { ERROR_OBJS } from '../utils'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const KEY = fs.readFileSync('../resources/private.key').toString('utf8')

async function token (req: Request, res: Response) {
  const {
    mail, 
    pw
  } = req.body

  if (!mail && pw) return res.json(ERROR_OBJS.MORE_BODY_REQUIRES('mail', 'pw'))

  const users: IUser[] = await db('users').where({ mail })
  const user = users[0]

  if (!user) return res.json(ERROR_OBJS.UNAUTHORIZED)
  if (sha256(user.salt + pw) === user.pw) {
    return res.json({
      token: jwt.sign({ id: user.id }, KEY)
    })
  }

  res.json(ERROR_OBJS.UNAUTHORIZED)
}

export default token
