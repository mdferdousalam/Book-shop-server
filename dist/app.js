"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const user_route_1 = require("./app/modules/user/user.route");
const admin_route_1 = require("./app/modules/admin/admin.route");
const auth_route_1 = require("./app/modules/auth/auth.route");
const book_route_1 = require("./app/modules/books/book.route");
const review_route_1 = require("./app/modules/reviews/review.route");
const wishlist_route_1 = require("./app/modules/wishlist/wishlist.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/users/', user_route_1.UserRoutes);
app.use('/api/v1/admin/', admin_route_1.AdminRoutes);
app.use('/api/v1/auth/', auth_route_1.AuthRoutes);
app.use('/api/v1/books/', book_route_1.BookRoutes);
app.use('/api/v1/review/', review_route_1.ReviewRoutes);
app.use('/api/v1/wishlist/', wishlist_route_1.WishlistRoutes);
app.use('/api/v1', routes_1.default);
//Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
