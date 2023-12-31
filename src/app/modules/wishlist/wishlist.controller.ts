import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from './wishlist.service'

// Add a book to the user's wishlist
export const addToWishlistHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId, bookId } = req.body

    const wishlistItem = await addToWishlist(userId, bookId)
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book added to wishlist',
      data: wishlistItem,
    })
  }
)

// Get the user's wishlist
export const getUserWishlistHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { userId } = req.params
    const wishlist = await getUserWishlist(userId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User wishlist retrieved successfully',
      data: wishlist,
    })
  }
)

// Remove a book from the user's wishlist
export const removeFromWishlistHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { wishlistItemId } = req.params
    const removedItem = await removeFromWishlist(wishlistItemId)
    if (!removedItem) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Wishlist item not found',
      })
      return
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Wishlist item removed successfully',
      data: removedItem,
    })
  }
)
