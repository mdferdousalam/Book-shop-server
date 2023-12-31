import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { BookRoutes } from '../modules/books/book.route'
import { ReviewRoutes } from '../modules/reviews/review.route'
import { WishlistRoutes } from '../modules/wishlist/wishlist.route'

const router = express.Router()

const moduleRoutes = [

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/wishlist',
    route: WishlistRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
