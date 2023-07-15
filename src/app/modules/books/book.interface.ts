

type IBook = {
  id: string
  title: string
  price: number
  author: string
  genre: string
  publicationDate: Date
  reviews?: IReview[]
}

type IReview = {
  id: string
  rating: number
  comment: string
  user: string
}

export { IBook, IReview }
