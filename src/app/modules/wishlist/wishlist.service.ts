import { ObjectId } from 'mongodb'
import WishlistItemModel, { IWishlistItem } from './wishlist.model'

// Add a book to the user's wishlist
export const addToWishlist = async (
  userId: ObjectId,
  bookId: ObjectId
): Promise<IWishlistItem> => {
  const newItem: IWishlistItem = new WishlistItemModel({
    user: userId,
    book: bookId,
  })

  return await newItem.save()
}

// Get the user's wishlist
export const getUserWishlist = async (
  userId: string
): Promise<IWishlistItem[]> => {
  return await WishlistItemModel.find({ user: new ObjectId(userId) }).populate(
    'book'
  )
}

// Remove a book from the user's wishlist
export const removeFromWishlist = async (
  wishlistItemId: string
): Promise<IWishlistItem | null> => {
  return await WishlistItemModel.findByIdAndDelete({
    _id: new ObjectId(wishlistItemId),
  })
}
