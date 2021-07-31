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
      }).then(([row]) => {
        db('groups')
          .where('id', row)
          .then((inserted) => {
            res.json({ ok: true, id: inserted[0].id })
          })
      })
  } else {
    res.json(ERROR_OBJS.MORE_BODY_REQUIRES('token', 'name'))
  }
}

async function getGroups (req: Request, res: Response) {
  const { token } = req.body
  const obj = jwt.decode(token)
  const { id } = obj as { id: string }

  const members = await db('members')
    .where({ id })
  
  res.send(members)
}

async function joinGroups (req: Request, res: Response) {
  const { token } = req.body
  const { targetId } = req.params

  if (targetId) {
    const obj = jwt.decode(token)
    const { id } = obj as { id: string }

    await db('members')
      .insert({
        targetId,
        userId: id
      })

      res.send({ ok: true })
  }
}

export { postGroups, joinGroups, getGroups }
