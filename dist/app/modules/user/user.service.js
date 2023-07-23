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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.loginUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const generateAccessToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ _id: userId, role }, config_1.default.secret_key, {
        expiresIn: '1h',
    });
};
const generateRefreshToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ _id: userId, role }, config_1.default.refresh_secret_key, {
        expiresIn: '7d',
    });
};
// Create a new user
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, role, name, phoneNumber, email } = userData;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield user_model_1.default.create({
            password: hashedPassword,
            email,
            role,
            name,
            phoneNumber,
        });
        const { _id, name: userName, email: userEmail, phoneNumber: userPhoneNumber, role: userRole, } = user;
        const accessToken = generateAccessToken(_id, userRole);
        const refreshToken = generateRefreshToken(_id, userRole);
        return {
            _id,
            role: userRole,
            name: userName,
            email: userEmail,
            phoneNumber: userPhoneNumber,
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw new Error('Failed to create user');
    }
});
exports.createUser = createUser;
const loginUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = input;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id, user.role);
    return {
        accessToken,
        refreshToken,
    };
});
exports.loginUser = loginUser;
// Get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.find();
    }
    catch (error) {
        throw new Error('Failed to retrieve users');
    }
});
exports.getAllUsers = getAllUsers;
// Get a single user by ID
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findById(userId);
    }
    catch (error) {
        throw new Error('Failed to retrieve user');
    }
});
exports.getUserById = getUserById;
// Update a user
const updateUser = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findByIdAndUpdate(userId, updatedUserData, {
            new: true,
        });
        return user;
    }
    catch (error) {
        throw new Error('Failed to update user');
    }
});
exports.updateUser = updateUser;
// Delete a user
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_model_1.default.findByIdAndRemove(userId);
    }
    catch (error) {
        throw new Error('Failed to delete user');
    }
});
exports.deleteUser = deleteUser;
