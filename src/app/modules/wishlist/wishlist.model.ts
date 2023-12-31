import { Schema, model, Document, ObjectId } from 'mongoose'

export type IWishlistItem = {
  user: ObjectId
  book: ObjectId
  addedAt: Date
} & Document

const wishlistItemSchema = new Schema<IWishlistItem>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
})

const WishlistItemModel = model<IWishlistItem>(
  'WishlistItem',
  wishlistItemSchema
)

export default WishlistItemModel
