import { BookModel, BookDocument } from './book.model'

// Create a new book
export const createBookService = async (
  bookData: BookDocument
): Promise<BookDocument> => {
  const newBook: BookDocument = new BookModel(bookData)
  return await newBook.save()
}

// Get all books with search and filter options
export const getAllBooksService = async (
  genre?: string | null,
  publicationYear?: number | null,
  searchQuery?: string | null
): Promise<BookDocument[]> => {
  let query = BookModel.find()

  // Apply genre filter if provided
  if (genre) {
    query = query.where('genre').equals(genre)
  }

  // Apply publication year filter if provided
  if (publicationYear) {
    query = query.where('publicationYear').equals(publicationYear)
  }

  // Apply search query if provided
  if (searchQuery) {
    query = query.or([
      { title: { $regex: searchQuery, $options: 'i' } },
      { author: { $regex: searchQuery, $options: 'i' } },
    ])
  }
  query = query.sort({ createdAt: -1 })
  const books = await query.exec()
  // return await query.exec()
  
  return books
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
