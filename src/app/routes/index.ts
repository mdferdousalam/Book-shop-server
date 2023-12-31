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
    path: '/api/v1/auth',
    route: AuthRoutes,
  },
  {
    path: '/api/v1/admin',
    route: AdminRoutes,
  },
  {
    path: '/api/v1/users',
    route: UserRoutes,
  },
  {
    path: '/api/v1/books',
    route: BookRoutes,
  },
  {
    path: '/api/v1/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/api/v1/wishlist',
    route: WishlistRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
