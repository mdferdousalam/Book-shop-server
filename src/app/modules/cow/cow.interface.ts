import { Document, Schema } from 'mongoose'

type ICow = {
  name: string
  age: number
  price: number
  location: string
  breed: string
  weight: number
  label: 'for sale' | 'sold out'
  category: 'Dairy' | 'Beef' | 'Dual Purpose'
  seller: Schema.Types.ObjectId
} & Document

export default ICow
