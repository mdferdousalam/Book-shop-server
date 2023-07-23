"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
        type: String,
        enum: [
            'registeredUser',
            'admin',
            'authorPublisher',
            'moderator',
        ],
        required: true,
    },
    password: { type: String, required: true },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    books: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'book' }],
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
