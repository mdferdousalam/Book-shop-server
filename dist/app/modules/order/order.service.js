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
exports.deleteOrder = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.updateUserIncome = exports.updateBookStatus = exports.updateUserBalance = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const book_model_1 = require("../books/book.model");
// Create a new order
const createOrder = (orderData, session) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = new order_model_1.default(orderData);
        const savedOrder = yield newOrder.save({ session });
        return savedOrder;
    }
    catch (error) {
        throw new Error('Failed to create order');
    }
});
exports.createOrder = createOrder;
// Update user's balance
const updateUserBalance = (userId, newBalance, session) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.findByIdAndUpdate(userId, { budget: newBalance }, { session });
    }
    catch (error) {
        throw new Error('Failed to update user balance');
    }
});
exports.updateUserBalance = updateUserBalance;
// Update cows' status to 'sold'
const updateBookStatus = (bookIds, newStatus, session) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.BookModel.updateMany({ _id: { $in: bookIds } }, { status: newStatus }, { session });
    }
    catch (error) {
        throw new Error('Failed to update book status');
    }
});
exports.updateBookStatus = updateBookStatus;
// Update user's income
const updateUserIncome = (userId, newIncome, session) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.findByIdAndUpdate(userId, { income: newIncome }, { session });
    }
    catch (error) {
        throw new Error('Failed to update user income');
    }
});
exports.updateUserIncome = updateUserIncome;
// Get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find();
        return orders;
    }
    catch (error) {
        throw new Error('Failed to retrieve orders');
    }
});
exports.getAllOrders = getAllOrders;
// Get a single order by ID
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield order_model_1.default.findById(orderId);
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }
    catch (error) {
        throw new Error('Failed to retrieve order');
    }
});
exports.getOrderById = getOrderById;
// Update an order
const updateOrder = (orderId, updatedOrderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
        if (!updatedOrder) {
            throw new Error('Order not found');
        }
        return updatedOrder;
    }
    catch (error) {
        throw new Error('Failed to update order');
    }
});
exports.updateOrder = updateOrder;
// Delete an order
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield order_model_1.default.findByIdAndRemove(orderId);
        if (!deletedOrder) {
            throw new Error('Order not found');
        }
        return deletedOrder;
    }
    catch (error) {
        throw new Error('Failed to delete order');
    }
});
exports.deleteOrder = deleteOrder;
