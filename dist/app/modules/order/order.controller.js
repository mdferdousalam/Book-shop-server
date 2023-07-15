"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderController = exports.updateOrderController = exports.getOrderByIdController = exports.getAllOrdersController = exports.createOrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("../user/user.service");
const order_service_1 = require("./order.service");
const book_service_1 = require("../books/book.service");
const startTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    return session;
});
// Create a new order
exports.createOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, registeredUser } = req.body;
    const products = []; // List of book IDs
    // Calculate total price based on the list of books
    let totalPrice = 0;
    for (const bookId of book) {
        const bookData = yield (0, book_service_1.getBookByIdService)(bookId);
        if (bookData) {
            products.push(bookId);
            totalPrice += bookData.price;
        }
    }
    // Check if the user is the buyer and has enough money to buy
    const userData = yield (0, user_service_1.getUserById)(registeredUser);
    if (!userData ||
        userData.role !== 'registeredUser' ||
        userData.budget < totalPrice) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: 'Insufficient funds or invalid user',
            data: null,
        });
        return;
    }
    // Start the transaction
    const session = yield startTransaction();
    try {
        // Deduct the cost of the order from the registeredUser's balance
        const updatedBalance = userData.budget - totalPrice;
        yield (0, order_service_1.updateUserBalance)(registeredUser, updatedBalance, session);
        // Change the status of books to 'sold'
        yield (0, order_service_1.updateBookStatus)(products, 'sold', session);
        // Create the order
        const orderData = {
            customerId: registeredUser,
            products,
            totalPrice,
        };
        const createdOrder = yield (0, order_service_1.createOrder)(orderData, session);
        // Increase the seller's income
        for (const bookId of products) {
            const userData = yield (0, user_service_1.getUserById)(bookId);
            if (userData) {
                const userId = userData._id.toString();
                const sellerData = yield (0, user_service_1.getUserById)(userId);
                if (sellerData && sellerData.role === 'registeredUser') {
                    const sellerIncome = sellerData.income + userData.income;
                    yield (0, order_service_1.updateUserIncome)(userId, sellerIncome, session);
                }
            }
        }
        // Commit the transaction
        yield session.commitTransaction();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.CREATED,
            success: true,
            message: 'Order created',
            data: createdOrder,
        });
    }
    catch (error) {
        // Rollback the transaction if any error occurs
        yield session.abortTransaction();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: `Failed to create order ${error.message}`,
            data: null,
        });
    }
    finally {
        // End the transaction session
        session.endSession();
    }
}));
// Get all orders
exports.getAllOrdersController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield (0, order_service_1.getAllOrders)();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved',
        data: orders,
    });
}));
// Get a single order by ID
exports.getOrderByIdController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield (0, order_service_1.getOrderById)(orderId);
    if (!order) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Order not found',
            data: null,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order retrieved',
            data: order,
        });
    }
}));
// Update an order
exports.updateOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const updatedOrderData = req.body;
    const updatedOrder = yield (0, order_service_1.updateOrder)(orderId, updatedOrderData);
    if (!updatedOrder) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Order not found',
            data: null,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order updated',
            data: updatedOrder,
        });
    }
}));
// Delete an order
exports.deleteOrderController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const deletedOrder = yield (0, order_service_1.deleteOrder)(orderId);
    if (!deletedOrder) {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.NOT_FOUND,
            success: false,
            message: 'Order not found',
            data: null,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order deleted',
            data: deletedOrder,
        });
    }
}));
