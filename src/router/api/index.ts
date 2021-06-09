import { Router } from 'express'

import { postGroups } from './routes/groups'
import register from './routes/register'
import token from './routes/token'

const router = Router()

router.post('/gropus', postGroups)
router.post('/register', register)
router.get('/token', token)

export default router
