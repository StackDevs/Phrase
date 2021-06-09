import { Request, Response } from 'express'
import { sha256 } from 'js-sha256'
import { db } from '../../../global'
import { ERROR_OBJS } from '../utils'
import jwt from 'jsonwebtoken'
import fs from 'fs'

const KEY = fs.readFileSync('../../resources/private.key').toString('utf8')

async function token (req: Request, res: Response) {
  const {
    mail, 
    pw
  } = req.body

  if (!mail && pw) return res.json(ERROR_OBJS.MORE_BODY_REQUIRES('mail', 'pw'))

  const user: IUser = (await db('users').where('mail', mail))[0]

  if (!user) return res.json(ERROR_OBJS.UNAUTHORIZED)
  if (sha256(user.salt + pw) === pw) {
    return res.json({
      token: jwt.sign({ mail }, KEY)
    })
  }

  res.json(ERROR_OBJS.UNAUTHORIZED)
}

export default token