"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const wishlistItemSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
});
const WishlistItemModel = (0, mongoose_1.model)('WishlistItem', wishlistItemSchema);
exports.default = WishlistItemModel;
