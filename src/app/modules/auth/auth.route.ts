import express from 'express'
import { createUserHandler, loginUserHandler } from '../user/user.controller'
import { getRefreshTokenHandler } from './auth.controller'

const router = express.Router()

// Create a new user
router.post('/signup', createUserHandler)
router.post('/login', loginUserHandler)
router.post('/refresh-token', getRefreshTokenHandler)

export const AuthRoutes = router
