"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyerOnly = exports.sellerOnly = exports.adminOnly = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
function authenticate(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }
    jsonwebtoken_1.default.verify(token, config_1.default.secret_key, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token',
            });
        }
        req.user = decodedToken;
        next();
    });
}
exports.authenticate = authenticate;
function adminOnly(req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin role required.',
        });
    }
    next();
}
exports.adminOnly = adminOnly;
function sellerOnly(req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'seller') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Seller role required.',
        });
    }
    next();
}
exports.sellerOnly = sellerOnly;
function buyerOnly(req, res, next) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'buyer') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Buyer role required.',
        });
    }
    next();
}
exports.buyerOnly = buyerOnly;
