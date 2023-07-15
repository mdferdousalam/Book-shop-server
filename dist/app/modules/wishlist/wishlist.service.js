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
exports.removeFromWishlist = exports.getUserWishlist = exports.addToWishlist = void 0;
const mongodb_1 = require("mongodb");
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
// Add a book to the user's wishlist
const addToWishlist = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new wishlist_model_1.default({
        user: userId,
        book: bookId,
    });
    return yield newItem.save();
});
exports.addToWishlist = addToWishlist;
// Get the user's wishlist
const getUserWishlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.default.find({ user: new mongodb_1.ObjectId(userId) }).populate('book');
});
exports.getUserWishlist = getUserWishlist;
// Remove a book from the user's wishlist
const removeFromWishlist = (wishlistItemId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield wishlist_model_1.default.findByIdAndDelete({
        _id: new mongodb_1.ObjectId(wishlistItemId),
    });
});
exports.removeFromWishlist = removeFromWishlist;
