import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { db } from '../../../global'
import { ERROR_OBJS } from '../utils'

async function postGroups (req: Request, res: Response) {
  const {
    token,
    name
  } = req.body
  
  if (name) {
    const obj = jwt.decode(token)
    const { mail } = obj as { mail: string }
    const users = await db('users').where('mail', mail)
    const user: IUser = users[0]
  
    db('groups')
      .insert({
        name,
        owner: user.id
      })
  } else {
    res.json(ERROR_OBJS.MORE_BODY_REQUIRES('token', 'name'))
  }
}

export { postGroups }
