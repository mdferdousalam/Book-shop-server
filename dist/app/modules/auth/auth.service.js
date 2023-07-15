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
exports.getRefreshToken = exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
//token verification function
function verifyRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refresh_secret_key);
            return decoded;
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    });
}
exports.verifyRefreshToken = verifyRefreshToken;
// Get Refresh Token
function getRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decoded = yield verifyRefreshToken(refreshToken);
            const { _id, role } = decoded;
            const accessToken = jsonwebtoken_1.default.sign({ _id, role }, config_1.default.secret_key, {
                expiresIn: '1h',
            });
            const newRefreshToken = jsonwebtoken_1.default.sign({ _id, role }, config_1.default.refresh_secret_key, {
                expiresIn: '7d',
            });
            return {
                accessToken,
                refreshToken: newRefreshToken,
            };
        }
        catch (error) {
            throw new Error('Invalid refresh token');
        }
    });
}
exports.getRefreshToken = getRefreshToken;
