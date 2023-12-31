import { Document} from 'mongoose'

export type UserRole =
  | 'registeredUser'
  | 'admin'
  | 'authorPublisher'
  | 'moderator'

export type ICreateUserInput = {
  phoneNumber: string
  email: string
  role: UserRole
  password: string
  name: {
    firstName: string
    lastName: string
  }
 
 
} & Document

export type IUpdateProfileInput = {
  password?: string
  email?: string
  name?: {
    firstName?: string
    lastName?: string
  }
  phoneNumber?: string

}

export type ICreateUserResponse = {
  _id: string
  role: string
  name: {
    firstName: string
    lastName: string
  }
  email: string
  phoneNumber: string
 
  accessToken: string
  refreshToken?: string
}

export type IUserLoginInput = {
  email: string
  password: string
}

export type IUserLoginResponse = {
  accessToken: string
  refreshToken: string
}
export type IUserRoleInput = {
  userId: string
  requestedRole: UserRole
}