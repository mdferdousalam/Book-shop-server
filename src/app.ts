import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
import { UserRoutes } from './app/modules/user/user.route'
import { CowRoutes } from './app/modules/cow/cow.route'
import { AdminRoutes } from './app/modules/admin/admin.route'
import { AuthRoutes } from './app/modules/auth/auth.route'

const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

import cookieParser from 'cookie-parser'
app.use(cookieParser())

app.use('/api/v1/users/', UserRoutes)
app.use('/api/v1/cows/', CowRoutes)
app.use('/api/v1/admin/', AdminRoutes)
app.use('/api/v1/auth/', AuthRoutes)

app.use('/api/v1', routes)

//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

//global error handler
app.use(globalErrorHandler)

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
