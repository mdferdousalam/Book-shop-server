import { Schema, model,Date, Document } from 'mongoose'
import { IBook } from './book.interface'

type BookDocument = Document & IBook

const bookSchema = new Schema<BookDocument>({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  reviews: [
    {
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
})

const BookModel = model<BookDocument>('Book', bookSchema)

export { BookModel, BookDocument }
