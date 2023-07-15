import ReviewModel, { IReview } from './review.model'
import { ObjectId } from 'mongodb'
// Create a new review
export const createReview = async (
  bookId: ObjectId,
  userId: ObjectId,
  rating: number,
  comment: string
): Promise<IReview> => {
  const newReview: IReview = new ReviewModel({
    book: new ObjectId(bookId),
    user: new ObjectId(userId),
    rating,
    comment,
  })

  return await newReview.save()
}

// Get all reviews for a book
export const getAllReviewsForBook = async (
  bookId: string
): Promise<IReview[]> => {
  return await ReviewModel.find({ book: new ObjectId(bookId) })
}

// Get a single review by ID
export const getReviewById = async (
  reviewId: string
): Promise<IReview | null> => {
  return await ReviewModel.findById(new ObjectId(reviewId))
}

// Update a review by ID
export const updateReviewById = async (
  reviewId: string,
  rating: number,
  comment: string
): Promise<IReview | null> => {
  return await ReviewModel.findByIdAndUpdate(
    new ObjectId(reviewId),
    { rating, comment },
    { new: true }
  )
}

// Delete a review by ID
export const deleteReviewById = async (
  reviewId: string
): Promise<IReview | null> => {
  return await ReviewModel.findByIdAndDelete(new ObjectId(reviewId))
}
