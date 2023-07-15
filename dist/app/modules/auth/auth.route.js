"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../user/user.controller");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
// Create a new user
router.post('/signup', user_controller_1.createUserHandler);
router.post('/login', user_controller_1.loginUserHandler);
router.post('/refresh-token', auth_controller_1.getRefreshTokenHandler);
exports.AuthRoutes = router;
