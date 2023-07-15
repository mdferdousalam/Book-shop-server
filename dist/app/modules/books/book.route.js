"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.get('/', book_controller_1.getAllBooksHandler);
router.get('/:id', book_controller_1.getBookByIdHandler);
router.post('/', book_controller_1.createBookHandler);
router.patch('/:id', book_controller_1.updateBookHandler);
router.delete('/:id', book_controller_1.deleteBookHandler);
exports.BookRoutes = router;
