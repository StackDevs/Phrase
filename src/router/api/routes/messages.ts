import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { db, io } from '../../../global'

async function postMessages (req: Request, res: Response) {
  const obj = jwt.decode(req.body.token)
  const { id: userId } = obj as { id: string }

  if (req.body.message && req.params.groupId) {
    const { message } = req.body
    const { groupId } = req.params
    
    const members = await db('members')
      .where({ groupId, userId })

    if (members.length <= 0) {
      return res.send({ ok: false })
    }

    io.sockets.emit('msg', { message, authorId: userId })
  }
}

export { postMessages }
