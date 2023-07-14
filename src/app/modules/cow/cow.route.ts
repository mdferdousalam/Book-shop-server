import express from 'express'
import { validateCow } from './cow.validation'

const router = express.Router()

import {
  createCow,
  getAllCows,
  getCowById,
  updateCow,
  deleteCow,
} from './cow.controller'
import {
  adminOnly,
  authenticate,
  sellerOnly,
} from '../../middlewares/auth.middleware'

// Create a new cow
router.post('/create-cows', authenticate, validateCow, createCow)

// Get all cows
router.get('/', authenticate, getAllCows)

// Get a single cow by ID
router.get('/:id', authenticate, getCowById)

// Update a cow
router.patch(
  '/:id',
  authenticate,
  adminOnly,
  sellerOnly,
  validateCow,
  updateCow
)

// Delete a cow
router.delete('/:id', authenticate, adminOnly, sellerOnly, deleteCow)

export const CowRoutes = router
