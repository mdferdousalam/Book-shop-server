import { ObjectId } from 'mongoose'

type IReview = {
  id: string
  book: ObjectId // ID of the book the review is for
  user: ObjectId // ID of the user who gave the review
  rating: number
  comment: string
}

export default IReview
