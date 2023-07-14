import { Document, Schema } from 'mongoose'

type UserRole = 'seller' | 'buyer' | 'admin'

export type ICreateUserInput = {
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
} & Document

export type IUpdateProfileInput = {
  password?: string
  name?: {
    firstName?: string
    lastName?: string
  }
  phoneNumber?: string
  address?: string
}

export type ICreateUserResponse = {
  _id: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  accessToken: string
  refreshToken?: string
}

export type IUserLoginInput = {
  phoneNumber: string
  password: string
}

export type IUserLoginResponse = {
  accessToken: string
  refreshToken: string
}
