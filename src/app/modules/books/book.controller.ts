import { Request, Response, NextFunction } from 'express'
import { BookModel, BookDocument } from './book.model'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
} from './book.service'

// Create a new book
export const createBookHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { title, author, genre, publicationDate, reviews } = req.body

    const newBook: BookDocument = new BookModel({
      title,
      author,
      genre,
      publicationDate,
      reviews,
    })

    const savedBook = await createBookService(newBook)

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Book created successfully!',
      data: savedBook,
    })
  }
)

// Get all books
export const getAllBooksHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await getAllBooksService()
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Books retrieved successfully',
        data: books,
      })
    } catch (error) {
      next(error)
    }
  }
)

// Get a single book by ID
export const getBookByIdHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      const book = await getBookByIdService(id)
      if (!book) {
        return sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'Book not found',
        })
      }
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book retrieved successfully',
        data: book,
      })
    } catch (error) {
      next(error)
    }
  }
)

// Update a book by ID
export const updateBookHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { title, author, genre, publicationDate, reviews } = req.body

    try {
      const book = await getBookByIdService(id)
      if (!book) {
        return sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'Book not found',
        })
      }

      book.title = title
      book.author = author
      book.genre = genre
      book.publicationDate = publicationDate
      book.reviews = reviews

      const updatedBook = await updateBookService(id, book)
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
      })
    } catch (error) {
      next(error)
    }
  }
)

// Delete a book by ID
export const deleteBookHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    try {
      const book = await deleteBookService(id)
      if (!book) {
        return sendResponse(res, {
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: 'Book not found',
        })
      }
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Book deleted successfully',
      })
    } catch (error) {
      next(error)
    }
  }
)
