import express from 'express'
import {
  createReviewHandler,
  getAllReviewsForBookHandler,
  getReviewByIdHandler,
  updateReviewByIdHandler,
  deleteReviewByIdHandler,
} from './review.controller'
const router = express.Router()

router.post('/', createReviewHandler)
router.get('/books/:bookId', getAllReviewsForBookHandler)
router.get('/review/:reviewId', getReviewByIdHandler)
router.patch('/review/:reviewId', updateReviewByIdHandler)
router.delete('/review/:reviewId', deleteReviewByIdHandler)

export const ReviewRoutes = router
