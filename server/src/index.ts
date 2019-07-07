import express, { Request, Response, NextFunction } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { RouterAdmin } from './routes'
import { RouterEmployee } from './routes'
import { ApiError } from './var'
import db from '../db'

const app = express()

app.use(bodyParser.json())

// session
app.use(
  session({
    secret: 'paypaypay', // TODO: move this to config
    resave: false,
    saveUninitialized: true
  })
)

// demo login
app.post('/v1/demo/login/:userId', (req, res) => {
  req.session!.userId = req.params.userId
  res.send()
})

/**
 * check authentication
 * @param admin  require user to be admin
 */
const auth = (admin?: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let userExists = false
    if (req.session && req.session.userId) {
      const [user] = await db('employee')
        .where('id', req.session.userId)
        .limit(1)
      if (user && (!admin || user.admin === 1)) {
        userExists = true
      }
    }
    if (userExists) {
      next()
    } else {
      next({
        code: ApiError.AuthRequired
      })
    }
  }
}

// admin apis
app.use('/v1/admin', auth(true /* admin */), RouterAdmin)
app.use('/v1', auth(), RouterEmployee)

// error handler
app.use(function(
  err: { code: ApiError },
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err)
  }
  switch (err.code) {
    case ApiError.RequestMalformed:
      res.status(400)
      break
    case ApiError.AuthRequired:
      res.status(401)
      break
    case ApiError.AuthForbidden:
      res.status(403)
      break
    default:
      res.status(500)
  }
  res.send(err.code)
})

app.listen(8081)
