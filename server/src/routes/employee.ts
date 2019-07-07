import express from 'express'
import db from '../../db'
import { getReviewsToEmployee } from '../utils/review'
import { ApiError } from '../var'

const router = express.Router()

// get current user
router.get('/session', async (req, res) => {
  const [user] = await db('employee')
    .where('id', req.session!.userId)
    .limit(1)
  res.json(user)
})

// logout
router.post('/logout', async (req, res) => {
  req.session!.userId = null
  res.send()
})

// get my reviews
router.get('/me/reviews/received', async (req, res, next) => {
  try {
    const list = await getReviewsToEmployee(
      req.session!.userId,
      true /* hasText */
    )
    res.send(list)
  } catch (e) {
    next({
      code: ApiError.RequestMalformed
    })
  }
})

export const RouterEmployee = router
