import { Document, Schema, model, Model, ObjectId } from 'mongoose'

export type ICow = {
  name: string
  age: number
  price: number
  location:
    | 'Dhaka'
    | 'Chattogram'
    | 'Barishal'
    | 'Rajshahi'
    | 'Sylhet'
    | 'Comilla'
    | 'Rangpur'
    | 'Mymensingh'
  breed: string
  weight: number
  label: 'for sale' | 'sold out'
  category: 'Dairy' | 'Beef' | 'Dual Purpose'
  seller: ObjectId
} & Document

const CowSchema: Schema<ICow> = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: {
      type: String,
      enum: [
        'Dhaka',
        'Chattogram',
        'Barishal',
        'Rajshahi',
        'Sylhet',
        'Comilla',
        'Rangpur',
        'Mymensingh',
      ],
      required: true,
    },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: { type: String, enum: ['for sale', 'sold out'], required: true },
    category: {
      type: String,
      enum: ['Dairy', 'Beef', 'Dual Purpose'],
      required: true,
    },
    seller: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
)

const Cow: Model<ICow> = model<ICow>('Cow', CowSchema)

export default Cow
