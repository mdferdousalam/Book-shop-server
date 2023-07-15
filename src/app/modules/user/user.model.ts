import { Schema, model, Document } from 'mongoose'
import { UserRole } from './user.interface'

export type IUser = Document & {
  phoneNumber: string
  email: string
  role: UserRole
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget: number
  income: number
  createdAt: Date
  updatedAt: Date
  books: Schema.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: [
        'guest',
        'registeredUser',
        'admin',
        'authorPublisher',
        'moderator',
      ],
      required: true,
    },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
    books: [{ type: Schema.Types.ObjectId, ref: 'book' }],
  },
  { timestamps: true }
)

const UserModel = model<IUser>('User', userSchema)

export default UserModel
