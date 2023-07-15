import { ObjectId } from 'mongoose'

type IWishlistItem = {
  id: string
  user: ObjectId // ID of the user who owns the wishlist
  book: ObjectId // ID of the book in the wishlist
  addedAt: Date // Date when the book was added to the wishlist
}

export default IWishlistItem
