"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router.post('/', review_controller_1.createReviewHandler);
router.get('/books/:bookId', review_controller_1.getAllReviewsForBookHandler);
router.get('/:id', review_controller_1.getReviewByIdHandler);
router.patch('/:id', review_controller_1.updateReviewByIdHandler);
router.delete('/:id', review_controller_1.deleteReviewByIdHandler);
exports.ReviewRoutes = router;
