import express from 'express'
import {
  getAllUsers,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
  createUserHandler,
} from './user.controller'
import { adminOnly, authenticate } from '../../middlewares/auth.middleware'
// import { validateUser } from './user.validation'
const router = express.Router()

// Create a new user
router.post('/signup', createUserHandler)

//login user
router.post('/login', loginUserHandler)

// Get all users
router.get('/', authenticate, adminOnly, getAllUsers)

// Get a single user by ID
router.get('/:id', authenticate, adminOnly, getUserByIdHandler)

// Update a user
router.patch('/:id', authenticate, updateUserHandler)

// Delete a user
router.delete('/:id', authenticate, adminOnly, deleteUserHandler)

export const UserRoutes = router
