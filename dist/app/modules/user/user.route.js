"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
// import { validateUser } from './user.validation'
const router = express_1.default.Router();
// Create a new user
router.post('/signup', user_controller_1.createUserHandler);
//login user
router.post('/login', user_controller_1.loginUserHandler);
// Get all users
router.get('/', auth_middleware_1.authenticate, auth_middleware_1.adminOnly, user_controller_1.getAllUsers);
// Get a single user by ID
router.get('/:id', auth_middleware_1.authenticate, auth_middleware_1.adminOnly, user_controller_1.getUserByIdHandler);
// Update a user
router.patch('/:id', auth_middleware_1.authenticate, user_controller_1.updateUserHandler);
// Delete a user
router.delete('/:id', auth_middleware_1.authenticate, auth_middleware_1.adminOnly, user_controller_1.deleteUserHandler);
exports.UserRoutes = router;
