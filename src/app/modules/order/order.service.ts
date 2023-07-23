// import Order from './order.model'
// import IOrder from './order.interface'
// import mongoose from 'mongoose'
// import UserModel from '../user/user.model'
// import {BookModel} from '../books/book.model'
// // Create a new order
// export const createOrder = async (
//   orderData: Partial<IOrder>,
//   session?: mongoose.ClientSession
// ): Promise<IOrder> => {
//   try {
//     const newOrder = new Order(orderData)
//     const savedOrder = await newOrder.save({ session })
//     return savedOrder
//   } catch (error) {
//     throw new Error('Failed to create order')
//   }
// }
// // Update user's balance
// export const updateUserBalance = async (
//   userId: string,
//   newBalance: number,
//   session?: mongoose.ClientSession
// ): Promise<void> => {
//   try {
//     await UserModel.findByIdAndUpdate(
//       userId,
//       { budget: newBalance },
//       { session }
//     )
//   } catch (error) {
//     throw new Error('Failed to update user balance')
//   }
// }

// // Update cows' status to 'sold'
// export const updateBookStatus = async (
//   bookIds: string[],
//   newStatus: string,
//   session?: mongoose.ClientSession
// ): Promise<void> => {
//   try {
//     await BookModel.updateMany(
//       { _id: { $in: bookIds } },
//       { status: newStatus },
//       { session }
//     )
//   } catch (error) {
//     throw new Error('Failed to update book status')
//   }
// }

// // Update user's income
// export const updateUserIncome = async (
//   userId: string,
//   newIncome: number,
//   session?: mongoose.ClientSession
// ): Promise<void> => {
//   try {
//     await UserModel.findByIdAndUpdate(
//       userId,
//       { income: newIncome },
//       { session }
//     )
//   } catch (error) {
//     throw new Error('Failed to update user income')
//   }
// }
// // Get all orders
// export const getAllOrders = async (): Promise<IOrder[]> => {
//   try {
//     const orders = await Order.find()
//     return orders
//   } catch (error) {
//     throw new Error('Failed to retrieve orders')
//   }
// }

// // Get a single order by ID
// export const getOrderById = async (orderId: string): Promise<IOrder> => {
//   try {
//     const order = await Order.findById(orderId)
//     if (!order) {
//       throw new Error('Order not found')
//     }
//     return order
//   } catch (error) {
//     throw new Error('Failed to retrieve order')
//   }
// }

// // Update an order
// export const updateOrder = async (
//   orderId: string,
//   updatedOrderData: Partial<IOrder>
// ): Promise<IOrder> => {
//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       updatedOrderData,
//       { new: true }
//     )
//     if (!updatedOrder) {
//       throw new Error('Order not found')
//     }
//     return updatedOrder
//   } catch (error) {
//     throw new Error('Failed to update order')
//   }
// }

// // Delete an order
// export const deleteOrder = async (orderId: string): Promise<IOrder> => {
//   try {
//     const deletedOrder = await Order.findByIdAndRemove(orderId)
//     if (!deletedOrder) {
//       throw new Error('Order not found')
//     }
//     return deletedOrder
//   } catch (error) {
//     throw new Error('Failed to delete order')
//   }
// }
