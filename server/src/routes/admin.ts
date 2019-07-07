import express from 'express'
import db from '../../db'
import { check, validationResult } from 'express-validator'
const router = express.Router()

// list up all the employees
router.get('/employees', async (req, res, next) => {
  try {
    const list = await db('employee').select()
    res.json({
      list,
      total: list.length
    })
  } catch (e) {
    next(e)
  }
})

// add new employee
router.post(
  '/employees',
  [
    check('name').isLength({ min: 1, max: 50 }),
    check('employee_id').isLength({ min: 1, max: 10 })
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next({
        code: 'request.malformed'
      })
      return
    }

    const newEmployee = {
      name: req.body.name,
      employee_id: req.body.employee_id
    }

    try {
      const result = await db('employee').insert({
        ...newEmployee,
        created_at: Date.now(),
        updated_at: Date.now()
      })

      res.json({
        ...newEmployee,
        id: result[0]
      })
    } catch (e) {
      e.code = 'request.malformed'
      next(e)
    }
  }
)

// update employee
router.put(
  '/employee/:id',
  [
    check('name').isLength({ min: 1, max: 50 }),
    check('employee_id').isLength({ min: 1, max: 10 })
  ],
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      next({
        type: 'request.malformat'
      })
    }

    const newEmployee = {
      name: req.body.name,
      employee_id: req.body.employee_id
    }

    try {
      await db('employee')
        .where('id', req.body.id)
        .update({
          ...newEmployee,
          updated_at: Date.now()
        })
      res.send()
    } catch (e) {
      e.code = 'request.malformed'
      next(e)
    }
  }
)

// get an employee
router.get('/employee/:id', async (req, res, next) => {
  try {
    const [employee] = await db('employee')
      .where('id', req.params.id)
      .limit(1)
    res.json({
      id: employee.id,
      name: employee.name,
      employee_id: employee.employee_id
    })
  } catch (e) {
    e.code = 'request.malformed'
    next(e)
  }
})

// remove an employee
router.delete('/employee/:id', async (req, res, next) => {
  try {
    await db('employee')
      .where('id', req.params.id)
      .delete()
    res.send()
  } catch (e) {
    e.code = 'request.malformed'
    next(e)
  }
})

// get all reviews of a employee
router.get('/employee/:id/reviews', async (req, res, next) => {
  try {
    const list = await db('review')
      .select([
        'review.*',
        'employee.name as reviewer__name',
        'employee.id as reviewer__id',
        'employee.employee_id as reviewer__employee_id'
      ])
      .leftJoin('employee', 'review.reviewer', 'employee.id')
      .where('reviewee', req.params.id)

    // nest reviewer
    res.send(
      list.map(review => ({
        id: review.id,
        reviewer: {
          id: review.reviewer__id,
          employee_id: review.reviewer__employee_id,
          name: review.reviewer__name
        },
        text: review.text
      }))
    )
  } catch (e) {
    e.code = 'request.malformed'
    next(e)
  }
})

// create a new review for an employee
// could set reviewer to anyone as assignment
router.post('/employee/:id/reviews', async (req, res, next) => {
  console.log(req.params)
  const newReview = {
    reviewer: req.body.reviewer || 1, // TODO auth
    reviewee: parseInt(req.params.id, 10),
    text: req.body.text
  }

  try {
    const result = await db('review').insert(newReview)
    res.send({
      ...newReview,
      id: result[0]
    })
  } catch (e) {
    e.code = 'request.malformed'
    next(e)
  }
})

// remove an employee
router.delete('/review/:id', async (req, res, next) => {
  try {
    await db('review')
      .where('id', req.params.id)
      .delete()
    res.send()
  } catch (e) {
    e.code = 'request.malformed'
    next(e)
  }
})

export const RouterAdmin = router
