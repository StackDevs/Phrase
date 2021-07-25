import { Router } from 'express'

import { joinGroups, postGroups } from './routes/groups'
import register from './routes/register'
import token from './routes/token'

import checkToken from './middlewares/checkToken'
import { postMessages } from './routes/messages'

const router = Router()

router.use(checkToken)

router.post('/gropus', postGroups)
router.post('/groups/:targetId/members', joinGroups)

router.post('/register', register)
router.get('/token', token)

router.post('/messages/:groupId', postMessages)

export default router
