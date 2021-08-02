import { Request, Response } from 'express'
import { sha256 } from 'js-sha256'
import { db } from '../../../global'
import { ERROR_OBJS, genSalt } from '../utils'

async function register (req: Request, res: Response) {
  const {
    id,
    pw
  } = req.body
  
  if (!id && pw) return res.json(ERROR_OBJS.MORE_BODY_REQUIRES('mail', 'pw'))
  
  const salt = genSalt()
  
  const user: IUser = {
    id,
    salt,
    pw: sha256(salt + pw)
  }

  await db('users')
    .insert(user)

  res.send({ ok: true })
}

export default register
