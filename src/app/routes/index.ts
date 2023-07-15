import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { OrderRoutes } from '../modules/order/order.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { BookRoutes } from '../modules/books/book.route'
import { ReviewRoutes } from '../modules/reviews/review.route'

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
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
