import express from 'express'
import db from '../../db'

const router = express.Router()

// get current user
router.get('/session', async (req, res, session) => {
  const [user] = await db('employee')
    .where('id', req.session!.userId)
    .limit(1)
  res.json(user)
})

// logout
router.post('/logout', async (req, res, session) => {
  req.session!.userId = null
  res.send()
})

export const RouterEmployee = router
