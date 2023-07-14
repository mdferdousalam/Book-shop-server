import { Request, Response } from 'express'
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateUserBalance,
  updateCowsStatus,
  updateUserIncome,
} from './order.service'

import IOrder from './order.interface'
import { getCowById } from '../cow/cow.service'
import { getUserById } from '../user/user.service'

const startTransaction = async () => {
  const session = await mongoose.startSession()
  session.startTransaction()
  return session
}

// Create a new order
export const createOrderController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { cow, buyer } = req.body
    const products: string[] = [] // List of cow IDs

    // Calculate total price based on the list of cows
    let totalPrice = 0
    for (const cowId of cow) {
      const cowData = await getCowById(cowId)
      if (cowData) {
        products.push(cowId)
        totalPrice += cowData.price
      }
    }

    // Check if the user is the buyer and has enough money to buy
    const userData = await getUserById(buyer)
    if (
      !userData ||
      userData.role !== 'buyer' ||
      userData.budget < totalPrice
    ) {
      sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Insufficient funds or invalid user',
        data: null,
      })
      return
    }

    // Start the transaction
    const session = await startTransaction()

    try {
      // Deduct the cost of the order from the buyer's balance
      const updatedBalance = userData.budget - totalPrice
      await updateUserBalance(buyer, updatedBalance, session)

      // Change the status of cows to 'sold'
      await updateCowsStatus(products, 'sold', session)

      // Create the order
      const orderData: Partial<IOrder> = {
        customerId: buyer,
        products,
        totalPrice,
      }
      const createdOrder = await createOrder(orderData, session)

      // Increase the seller's income
      for (const cowId of products) {
        const cowData = await getCowById(cowId)
        if (cowData) {
          const sellerId = cowData.seller.toString()
          const sellerData = await getUserById(sellerId)
          if (sellerData && sellerData.role === 'seller') {
            const sellerIncome = sellerData.income + cowData.price
            await updateUserIncome(sellerId, sellerIncome, session)
          }
        }
      }
      // Commit the transaction
      await session.commitTransaction()

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Order created',
        data: createdOrder,
      })
    } catch (error) {
      // Rollback the transaction if any error occurs
      await session.abortTransaction()
      sendResponse(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: `Failed to create order ${(error as Error).message}`,
        data: null,
      })
    } finally {
      // End the transaction session
      session.endSession()
    }
  }
)

// Get all orders
export const getAllOrdersController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orders = await getAllOrders()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved',
      data: orders,
    })
  }
)

// Get a single order by ID
export const getOrderByIdController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.id
    const order = await getOrderById(orderId)
    if (!order) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order retrieved',
        data: order,
      })
    }
  }
)

// Update an order
export const updateOrderController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.id
    const updatedOrderData = req.body
    const updatedOrder = await updateOrder(orderId, updatedOrderData)
    if (!updatedOrder) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order updated',
        data: updatedOrder,
      })
    }
  }
)

// Delete an order
export const deleteOrderController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const orderId = req.params.id
    const deletedOrder = await deleteOrder(orderId)
    if (!deletedOrder) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Order not found',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order deleted',
        data: deletedOrder,
      })
    }
  }
)
