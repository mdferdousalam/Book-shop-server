import { Schema, model, Document } from 'mongoose'

export type UserRole = 'seller' | 'buyer' | 'admin'

export type IUser = Document & {
  phoneNumber: string
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
  cows: Schema.Types.ObjectId[]
}

const userSchema: Schema<IUser> = new Schema(
  {
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['seller', 'buyer', 'admin'], required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
    budget: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
    cows: [{ type: Schema.Types.ObjectId, ref: 'Cow' }],
  },
  { timestamps: true }
)

const UserModel = model<IUser>('User', userSchema)

export default UserModel
