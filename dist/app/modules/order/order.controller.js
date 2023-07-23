"use strict";
// import { Request, Response } from 'express'
// import httpStatus from 'http-status'
// import mongoose from 'mongoose'
// import { RequestHandler } from 'express-serve-static-core'
// import catchAsync from '../../../shared/catchAsync'
// import sendResponse from '../../../shared/sendResponse'
// import IOrder from './order.interface'
// import { getUserById } from '../user/user.service'
// import {
//   createOrder,
//   getAllOrders,
//   getOrderById,
//   updateOrder,
//   deleteOrder,
//   updateUserBalance,
//   updateUserIncome,
//   updateBookStatus,
// } from './order.service'
// import { getBookByIdService } from '../books/book.service'
// const startTransaction = async () => {
//   const session = await mongoose.startSession()
//   session.startTransaction()
//   return session
// }
// // Create a new order
// export const createOrderController: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const { book, registeredUser } = req.body
//     const products: string[] = [] // List of book IDs
//     // Calculate total price based on the list of books
//     let totalPrice = 0
//     for (const bookId of book) {
//       const bookData = await getBookByIdService(bookId)
//       if (bookData) {
//         products.push(bookId)
//         totalPrice += bookData.price
//       }
//     }
//     // Check if the user is the buyer and has enough money to buy
//     const userData = await getUserById(registeredUser)
//     if (
//       !userData ||
//       userData.role !== 'registeredUser' ||
//       userData.budget < totalPrice
//     ) {
//       sendResponse(res, {
//         statusCode: httpStatus.BAD_REQUEST,
//         success: false,
//         message: 'Insufficient funds or invalid user',
//         data: null,
//       })
//       return
//     }
//     // Start the transaction
//     const session = await startTransaction()
//     try {
//       // Deduct the cost of the order from the registeredUser's balance
//       const updatedBalance = userData.budget - totalPrice
//       await updateUserBalance(registeredUser, updatedBalance, session)
//       // Change the status of books to 'sold'
//       await updateBookStatus(products, 'sold', session)
//       // Create the order
//       const orderData: Partial<IOrder> = {
//         customerId: registeredUser,
//         products,
//         totalPrice,
//       }
//       const createdOrder = await createOrder(orderData, session)
//       // Increase the seller's income
//       for (const bookId of products) {
//         const userData = await getUserById(bookId)
//         if (userData) {
//           const userId = userData._id.toString()
//           const sellerData = await getUserById(userId)
//           if (sellerData && sellerData.role === 'registeredUser') {
//             await updateUserIncome(userId, sellerIncome, session)
//           }
//         }
//       }
//       // Commit the transaction
//       await session.commitTransaction()
//       sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: 'Order created',
//         data: createdOrder,
//       })
//     } catch (error) {
//       // Rollback the transaction if any error occurs
//       await session.abortTransaction()
//       sendResponse(res, {
//         statusCode: httpStatus.INTERNAL_SERVER_ERROR,
//         success: false,
//         message: `Failed to create order ${(error as Error).message}`,
//         data: null,
//       })
//     } finally {
//       // End the transaction session
//       session.endSession()
//     }
//   }
// )
// // Get all orders
// export const getAllOrdersController: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const orders = await getAllOrders()
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Orders retrieved',
//       data: orders,
//     })
//   }
// )
// // Get a single order by ID
// export const getOrderByIdController: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const orderId = req.params.id
//     const order = await getOrderById(orderId)
//     if (!order) {
//       sendResponse(res, {
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: 'Order not found',
//         data: null,
//       })
//     } else {
//       sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Order retrieved',
//         data: order,
//       })
//     }
//   }
// )
// // Update an order
// export const updateOrderController: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const orderId = req.params.id
//     const updatedOrderData = req.body
//     const updatedOrder = await updateOrder(orderId, updatedOrderData)
//     if (!updatedOrder) {
//       sendResponse(res, {
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: 'Order not found',
//         data: null,
//       })
//     } else {
//       sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Order updated',
//         data: updatedOrder,
//       })
//     }
//   }
// )
// // Delete an order
// export const deleteOrderController: RequestHandler = catchAsync(
//   async (req: Request, res: Response) => {
//     const orderId = req.params.id
//     const deletedOrder = await deleteOrder(orderId)
//     if (!deletedOrder) {
//       sendResponse(res, {
//         statusCode: httpStatus.NOT_FOUND,
//         success: false,
//         message: 'Order not found',
//         data: null,
//       })
//     } else {
//       sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Order deleted',
//         data: deletedOrder,
//       })
//     }
//   }
// )
