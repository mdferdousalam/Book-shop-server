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
  requestedRole?: UserRole // added new
  createdAt: Date
  updatedAt: Date
  books?: Schema.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: {
      type: String,
      enum: ['registeredUser', 'admin', 'authorPublisher', 'moderator'],
      required: true,
    },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },

    books: [{ type: Schema.Types.ObjectId, ref: 'book' }],
  },
  { timestamps: true }
)

const UserModel = model<IUser>('User', userSchema)

export default UserModel
