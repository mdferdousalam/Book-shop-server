import express from 'express'
import { createUserHandler } from '../user/user.controller'
import { getRefreshTokenHandler } from './auth.controller'

const router = express.Router()

// Create a new user
router.post('/signup', createUserHandler)
router.post('/refresh-token', getRefreshTokenHandler)

export const AuthRoutes = router
