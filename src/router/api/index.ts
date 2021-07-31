import { Router } from 'express'

import { getGroups, joinGroups, postGroups } from './routes/groups'
import register from './routes/register'
import token from './routes/token'

import checkToken from './middlewares/checkToken'
import { postMessages } from './routes/messages'

const router = Router()

router.use(/^(?!.*(register||token)).*/, checkToken)

router.post('/groups', postGroups)
router.post('/groups/:targetId/members', joinGroups)
router.get('/groups/my', getGroups)

router.post('/register', register)
router.get('/token', token)

router.post('/messages/:groupId', postMessages)

export default router
