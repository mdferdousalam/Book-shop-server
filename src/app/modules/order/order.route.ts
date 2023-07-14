import express from 'express'
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
} from './order.controller'
import {
  adminOnly,
  authenticate,
  buyerOnly,
} from '../../middlewares/auth.middleware'

const router = express.Router()

// Create a new order
router.post('/buy', authenticate, buyerOnly, createOrderController)

// Get all orders
router.get('/', authenticate, buyerOnly, adminOnly, getAllOrdersController)

// Get a single order by ID
router.get('/:id', authenticate, getOrderByIdController)

// Update an order
router.patch('/:id', authenticate, adminOnly, updateOrderController)

// Delete an order
router.delete('/:id', authenticate, adminOnly, deleteOrderController)

export const OrderRoutes = router
