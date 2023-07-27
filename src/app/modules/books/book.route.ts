import express from 'express'
import { createBookHandler, deleteBookHandler, getAllBooksHandler, getBookByIdHandler, updateBookHandler } from './book.controller'
const router = express.Router()

router.get('/all-books', getAllBooksHandler)
router.get('/single-book/:id', getBookByIdHandler)
router.post('/add-book', createBookHandler)
router.patch('/edit-book/:id', updateBookHandler)
router.delete('/delete-book/:id', deleteBookHandler)

export const BookRoutes = router
