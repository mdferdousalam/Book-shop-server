import express from 'express'
import {
  createBookHandler,
  deleteBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
} from './book.controller'
const router = express.Router()

router.get('/', getAllBooksHandler)
router.get('/:id', getBookByIdHandler)
router.post('/', createBookHandler)
router.patch('/:id', updateBookHandler)
router.delete('/:id', deleteBookHandler)

export const BookRoutes = router
