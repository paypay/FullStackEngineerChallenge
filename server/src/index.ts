import express from 'express'
import bodyParser from 'body-parser'
import { RouterAdmin } from './routes'

const app = express()

app.use(bodyParser.json())
app.use('/admin/v1', RouterAdmin)

// error handler
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  switch (err.code) {
    case 'request.malformed':
      res.status(400)
      break
    case 'auth.required':
      res.status(401)
      break
    case 'auth.forbidden':
      res.status(403)
      break
    default:
      res.status(500)
  }
  res.send(err.code)
})
app.listen(8081)
