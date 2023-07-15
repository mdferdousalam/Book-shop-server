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
exports.adminLogin = exports.createAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = __importDefault(require("../admin/admin.model"));
const config_1 = __importDefault(require("../../../config"));
const generateAccessToken = (adminId, role) => {
    return jsonwebtoken_1.default.sign({ _id: adminId, role }, config_1.default.secret_key, {
        expiresIn: '1h',
    });
};
const generateRefreshToken = (adminId, role) => {
    return jsonwebtoken_1.default.sign({ _id: adminId, role }, config_1.default.refresh_secret_key, {
        expiresIn: '7d',
    });
};
function createAdmin(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, role, name, phoneNumber, address } = input;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const admin = yield admin_model_1.default.create({
            password: hashedPassword,
            role,
            name,
            phoneNumber,
            address,
        });
        const { _id, name: adminName, phoneNumber: adminPhoneNumber, address: adminAddress, role: adminRole, } = admin;
        const accessToken = generateAccessToken(_id, adminRole);
        const refreshToken = generateRefreshToken(_id, adminRole);
        return {
            _id,
            role: adminRole,
            name: adminName,
            phoneNumber: adminPhoneNumber,
            address: adminAddress,
            accessToken,
            refreshToken,
        };
    });
}
exports.createAdmin = createAdmin;
function adminLogin(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phoneNumber, password } = input;
        const admin = yield admin_model_1.default.findOne({ phoneNumber });
        if (!admin) {
            throw new Error('Admin not found');
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, admin.password);
        if (!passwordMatch) {
            throw new Error('Invalid password');
        }
        const accessToken = generateAccessToken(admin._id, admin.role);
        const refreshToken = generateRefreshToken(admin._id, admin.role);
        return {
            accessToken,
            refreshToken,
        };
    });
}
exports.adminLogin = adminLogin;
