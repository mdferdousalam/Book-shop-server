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
router.get('/', getAllReviewsForBookHandler)
router.get('/:id', getReviewByIdHandler)
router.patch('/:id', updateReviewByIdHandler)
router.delete('/:id', deleteReviewByIdHandler)

export const ReviewRoutes = router
