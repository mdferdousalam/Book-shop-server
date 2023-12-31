import { Schema, model, Document, ObjectId } from 'mongoose'

export type IReview = {
  book: ObjectId
  user: ObjectId
  rating: number
  comment: string
} & Document

const reviewSchema = new Schema<IReview>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

const ReviewModel = model<IReview>('Review', reviewSchema)

export default ReviewModel
