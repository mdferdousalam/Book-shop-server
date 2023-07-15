import { BookModel, BookDocument } from './book.model'

// Create a new book
export const createBookService = async (
  bookData: BookDocument
): Promise<BookDocument> => {
  const newBook: BookDocument = new BookModel(bookData)
  return await newBook.save()
}

// Get all books
export const getAllBooksService = async (): Promise<BookDocument[]> => {
  return await BookModel.find()
}

// Get a single book by ID
export const getBookByIdService = async (
  id: string
): Promise<BookDocument | null> => {
  return await BookModel.findById(id)
}

// Update a book by ID
export const updateBookService = async (
  id: string,
  bookData: BookDocument
): Promise<BookDocument | null> => {
  return await BookModel.findByIdAndUpdate(id, bookData, { new: true })
}

// Delete a book by ID
export const deleteBookService = async (
  id: string
): Promise<BookDocument | null> => {
  return await BookModel.findByIdAndDelete(id)
}
