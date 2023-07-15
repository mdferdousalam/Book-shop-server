import express from 'express'
import {
  addToWishlistHandler,
  getUserWishlistHandler,
  removeFromWishlistHandler,
} from './wishlist.controller'
const router = express.Router()

router.post('/', addToWishlistHandler)
router.get('/:userId', getUserWishlistHandler)
router.delete('/:wishlistItemId', removeFromWishlistHandler)

export const WishlistRoutes = router
