import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'

import {
  createReview,
  getAllReviewsForBook,
  getReviewById,
  updateReviewById,
  deleteReviewById,
} from './review.service'

// Create a new review
export const createReviewHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId, userId, rating, comment } = req.body

    const newReview = await createReview(bookId, userId, rating, comment)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Review created successfully!',
      data: newReview,
    })
  }
)

// Get all reviews for a book
export const getAllReviewsForBookHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { bookId } = req.params

    const reviews = await getAllReviewsForBook(bookId)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully',
      data: reviews,
    })
  }
)

// Get a single review by ID
export const getReviewByIdHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { reviewId } = req.params
    if (!reviewId) {
      sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: 'Invalid review ID',
      })
      return
    }

    const review = await getReviewById(reviewId)

    if (!review) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Review not found',
      })
      return
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrieved successfully',
      data: review,
    })
  }
)

// Update a review by ID
export const updateReviewByIdHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { reviewId } = req.params
    const { rating, comment } = req.body

    const updatedReview = await updateReviewById(reviewId, rating, comment)

    if (!updatedReview) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Review not found',
      })
      return
    }

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
    })
  }
)

// Delete a review by ID
export const deleteReviewByIdHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { reviewId } = req.params

    const deletedReview = await deleteReviewById(reviewId)

    if (!deletedReview) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Review not found',
      })
      return
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review deleted successfully',
    })
  }
)
