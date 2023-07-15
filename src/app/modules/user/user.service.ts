import UserModel from './user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../../config'
import {
  ICreateUserInput,
  ICreateUserResponse,
  IUpdateProfileInput,
  IUserLoginInput,
  IUserLoginResponse,
} from './user.interface'

const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ _id: userId, role }, config.secret_key as string, {
    expiresIn: '1h',
  })
}

const generateRefreshToken = (userId: string, role: string) => {
  return jwt.sign({ _id: userId, role }, config.refresh_secret_key as string, {
    expiresIn: '7d',
  })
}
// Create a new user
export const createUser = async (
  userData: ICreateUserInput
): Promise<ICreateUserResponse> => {
  try {
    const { password, role, name, phoneNumber, address, email } = userData
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
      password: hashedPassword,
      email,
      role,
      name,
      phoneNumber,
      address,
    })
    const {
      _id,
      name: userName,
      email:userEmail,
      phoneNumber: userPhoneNumber,
      address: userAddress,
      role: userRole,
    } = user

    const accessToken = generateAccessToken(_id, userRole)
    const refreshToken = generateRefreshToken(_id, userRole)

    return {
      _id,
      role: userRole,
      name: userName,
      email:userEmail,
      phoneNumber: userPhoneNumber,
      address: userAddress,
      accessToken,
      refreshToken,
    }
  } catch (error) {
    throw new Error('Failed to create user')
  }
}

export const loginUser = async (
  input: IUserLoginInput
): Promise<IUserLoginResponse> => {
  const { email, password } = input
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new Error('User not found')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new Error('Invalid password')
  }

  const accessToken = generateAccessToken(user._id, user.role)
  const refreshToken = generateRefreshToken(user._id, user.role)

  return {
    accessToken,
    refreshToken,
  }
}

// Get all users
export const getAllUsers = async () => {
  try {
    return await UserModel.find()
  } catch (error) {
    throw new Error('Failed to retrieve users')
  }
}

// Get a single user by ID
export const getUserById = async (userId: string) => {
  try {
    return await UserModel.findById(userId)
  } catch (error) {
    throw new Error('Failed to retrieve user')
  }
}

// Update a user
export const updateUser = async (
  userId: string,
  updatedUserData: IUpdateProfileInput
) => {
  try {
    const user = await UserModel.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    })
    return user
  } catch (error) {
    throw new Error('Failed to update user')
  }
}


// Delete a user
export const deleteUser = async (userId: string) => {
  try {
    return await UserModel.findByIdAndRemove(userId)
  } catch (error) {
    throw new Error('Failed to delete user')
  }
}
