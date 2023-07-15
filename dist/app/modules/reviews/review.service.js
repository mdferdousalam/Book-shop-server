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
exports.deleteReviewById = exports.updateReviewById = exports.getReviewById = exports.getAllReviewsForBook = exports.createReview = void 0;
const review_model_1 = __importDefault(require("./review.model"));
const mongodb_1 = require("mongodb");
// Create a new review
const createReview = (bookId, userId, rating, comment) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = new review_model_1.default({
        book: new mongodb_1.ObjectId(bookId),
        user: new mongodb_1.ObjectId(userId),
        rating,
        comment,
    });
    return yield newReview.save();
});
exports.createReview = createReview;
// Get all reviews for a book
const getAllReviewsForBook = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.find({ _id: new mongodb_1.ObjectId(bookId) });
});
exports.getAllReviewsForBook = getAllReviewsForBook;
// Get a single review by ID
const getReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.findById({ _id: new mongodb_1.ObjectId(reviewId) });
});
exports.getReviewById = getReviewById;
// Update a review by ID
const updateReviewById = (reviewId, rating, comment) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.findByIdAndUpdate({ _id: new mongodb_1.ObjectId(reviewId) }, { rating, comment }, { new: true });
});
exports.updateReviewById = updateReviewById;
// Delete a review by ID
const deleteReviewById = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield review_model_1.default.findByIdAndDelete({ _id: new mongodb_1.ObjectId(reviewId) });
});
exports.deleteReviewById = deleteReviewById;
