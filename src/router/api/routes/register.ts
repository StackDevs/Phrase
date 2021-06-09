import { Request, Response } from 'express'
import { sha256 } from 'js-sha256'
import { db } from '../../../global'
import { ERROR_OBJS, genSalt } from '../utils'

async function register (req: Request, res: Response) {
  const {
    mail,
    pw
  } = req.body
  
  if (!mail && pw) return res.json(ERROR_OBJS.MORE_BODY_REQUIRES('mail', 'pw'))
  
  const salt = genSalt()
  
  const user: IUser = {
    mail,
    salt,
    pw: sha256(salt + pw)
  }
  
  db('users')
    .insert(user)
    .then(() => {
      res.json({
        code: 200
      })
  })
}

export default register