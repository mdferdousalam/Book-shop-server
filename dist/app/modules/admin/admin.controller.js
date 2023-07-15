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
exports.AdminController = exports.adminLoginHandler = exports.createAdminHandler = void 0;
const admin_service_1 = require("../admin/admin.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
//create new admin
exports.createAdminHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const admin = yield (0, admin_service_1.createAdmin)(input);
    res.cookie('refreshToken', admin.refreshToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    if ('refreshToken' in admin) {
        delete admin.refreshToken;
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Admin created successfully',
        data: admin,
    });
}));
exports.adminLoginHandler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    const { accessToken } = yield (0, admin_service_1.adminLogin)(input);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Admin logged in successfully',
        data: {
            accessToken,
        },
    });
}));
exports.AdminController = {
    createAdminHandler: exports.createAdminHandler,
    adminLoginHandler: exports.adminLoginHandler,
};
