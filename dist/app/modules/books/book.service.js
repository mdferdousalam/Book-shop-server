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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.getBookByIdService = exports.getAllBooksService = exports.createBookService = void 0;
const book_model_1 = require("./book.model");
// Create a new book
const createBookService = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = new book_model_1.BookModel(bookData);
    return yield newBook.save();
});
exports.createBookService = createBookService;
// Get all books
const getAllBooksService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.find();
});
exports.getAllBooksService = getAllBooksService;
// Get a single book by ID
const getBookByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.findById(id);
});
exports.getBookByIdService = getBookByIdService;
// Update a book by ID
const updateBookService = (id, bookData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.findByIdAndUpdate(id, bookData, { new: true });
});
exports.updateBookService = updateBookService;
// Delete a book by ID
const deleteBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield book_model_1.BookModel.findByIdAndDelete(id);
});
exports.deleteBookService = deleteBookService;
