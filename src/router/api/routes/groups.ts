import { Request, Response } from 'express'
import fs from 'fs'
import jwt, { VerifyErrors } from 'jsonwebtoken'

import { db } from '../../../global'
import { ERROR_OBJS } from '../utils'

const KEY = fs.readFileSync('../../resources/private.key').toString('utf8')

async function postGroups (req: Request, res: Response) {
  const {
    token,
    name
  } = req.body
  
  if (token && name) {
    jwt.verify(token, KEY, async (err: VerifyErrors | null, obj?: object) => {
      if (err) res.json({ err: 401 })
      const { mail } = obj as { mail: string }
      const users = await db('users').where('mail', mail)
      const user: IUser = users[0]
  
      db('groups')
        .insert({
          name,
          owner: user.id
        })
    })
  } else {
    res.json(ERROR_OBJS.MORE_BODY_REQUIRES('token', 'name'))
  }
}

export { postGroups }
