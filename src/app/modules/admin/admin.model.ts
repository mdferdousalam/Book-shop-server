import mongoose, { Document, Schema } from 'mongoose'

export type IAdmin = {
  _id: string
  phoneNumber: string
  role: string
  password: string
  email:string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  createdAt: Date
  updatedAt: Date
} & Document

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin'], required: true },
    password: { type: String, required: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    address: { type: String, required: true },
  },
  { timestamps: true }
)

const Admin = mongoose.model<IAdmin>('Admin', adminSchema)

export default Admin
