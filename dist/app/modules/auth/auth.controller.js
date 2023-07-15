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
exports.AuthController = exports.getRefreshTokenHandler = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("../user/user.service");
const config_1 = __importDefault(require("../../../config"));
const auth_service_1 = require("./auth.service");
// Create a new user
exports.createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield (0, user_service_1.createUser)(userData);
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    if ('refreshToken' in result) {
        delete result.refreshToken;
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user created successfully!',
        data: result,
    });
}));
// Get Refresh Token
exports.getRefreshTokenHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const response = yield (0, auth_service_1.getRefreshToken)(refreshToken);
    res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'New access token generated successfully!',
        data: {
            accessToken: response.accessToken,
        },
    });
}));
exports.AuthController = {
    createUser: exports.createUser,
    getRefreshTokenHandler: exports.getRefreshTokenHandler,
};
