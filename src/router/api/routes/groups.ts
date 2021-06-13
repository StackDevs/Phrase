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
    const { id } = obj as { id: string }
  
    db('groups')
      .insert({
        name,
        owner: id
      }).then(() => {
        res.json({ ok: true })
      })
  } else {
    res.json(ERROR_OBJS.MORE_BODY_REQUIRES('token', 'name'))
  }
}

async function joinGroups (req: Request, res: Response) {
  const { token } = req.body
  const { targetId } = req.params

  if (targetId) {
    const obj = jwt.decode(token)
    const { id } = obj as { id: string }

    db('members')
      .insert({
        targetId,
        userId: id
      }).then(() => {
        res.json({ ok: true })
      })
  }
}

export { postGroups, joinGroups }
