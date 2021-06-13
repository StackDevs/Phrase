import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import jwt, { VerifyErrors } from 'jsonwebtoken'

const KEY = fs.readFileSync('../resources/private.key').toString('utf8')

async function checkToken (req: Request, res: Response, next: NextFunction) {
  const { token } = req.body

  jwt.verify(token, KEY, (err: VerifyErrors | null, decoded?: object) => {
    if (err) return res.json({ err: 401 })

    next()
  })
}

export default checkToken
