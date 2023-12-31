"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
// import { OrderRoutes } from '../modules/order/order.route'
const admin_route_1 = require("../modules/admin/admin.route");
const book_route_1 = require("../modules/books/book.route");
const review_route_1 = require("../modules/reviews/review.route");
const wishlist_route_1 = require("../modules/wishlist/wishlist.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    // {
    //   path: '/orders',
    //   route: OrderRoutes,
    // },
    {
        path: '/books',
        route: book_route_1.BookRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/wishlist',
        route: wishlist_route_1.WishlistRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
