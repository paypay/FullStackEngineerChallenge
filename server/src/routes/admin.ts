import express from 'express'
import db from '../../db'
import { ApiError } from '../var'
import { getReviewsToEmployee } from '../utils/review'
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
router.post('/employees', async (req, res, next) => {
  const newEmployee = {
    name: req.body.name,
    employee_id: req.body.employee_id,
    admin: req.body.admin ? 1 : 0
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
    next({
      code: ApiError.RequestMalformed
    })
  }
})

// update employee
router.put('/employee/:id', async (req, res, next) => {
  const newEmployee = {
    name: req.body.name,
    employee_id: req.body.employee_id,
    admin: req.body.admin ? 1 : 0
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
    next({
      code: ApiError.RequestMalformed
    })
  }
})

// get an employee
router.get('/employee/:id', async (req, res, next) => {
  try {
    const [employee] = await db('employee')
      .where('id', req.params.id)
      .limit(1)
    res.json({
      id: employee.id,
      name: employee.name,
      employee_id: employee.employee_id,
      admin: !!employee.admin
    })
  } catch (e) {
    next({
      code: ApiError.RequestMalformed
    })
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
    next({
      code: ApiError.RequestMalformed
    })
  }
})

// get all reviews of a employee
router.get('/employee/:id/reviews', async (req, res, next) => {
  try {
    const list = await getReviewsToEmployee(req.params.id)
    res.send(list)
  } catch (e) {
    next({
      code: ApiError.RequestMalformed
    })
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
    next({
      code: ApiError.RequestMalformed
    })
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
    next({
      code: ApiError.RequestMalformed
    })
  }
})

export const RouterAdmin = router
