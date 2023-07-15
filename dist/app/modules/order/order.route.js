"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Create a new order
router.post('/buy', auth_middleware_1.authenticate, auth_middleware_1.buyerOnly, order_controller_1.createOrderController);
// Get all orders
router.get('/', auth_middleware_1.authenticate, auth_middleware_1.buyerOnly, auth_middleware_1.adminOnly, order_controller_1.getAllOrdersController);
// Get a single order by ID
router.get('/:id', auth_middleware_1.authenticate, order_controller_1.getOrderByIdController);
// Update an order
router.patch('/:id', auth_middleware_1.authenticate, auth_middleware_1.adminOnly, order_controller_1.updateOrderController);
// Delete an order
router.delete('/:id', auth_middleware_1.authenticate, auth_middleware_1.adminOnly, order_controller_1.deleteOrderController);
exports.OrderRoutes = router;
