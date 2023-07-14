import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import {
  createUser,
  loginUser,
  getAllUsers as getAllUsersFromService,
  getUserById,
  updateUser,
  deleteUser,
} from './user.service'
import {
  ICreateUserInput,
  IUpdateProfileInput,
  IUserLoginInput,
} from './user.interface'
import config from '../../../config'

// Create a new user
export const createUserHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const input: ICreateUserInput = req.body
    const result = await createUser(input)

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: config.env === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    if ('refreshToken' in result) {
      delete result.refreshToken
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  }
)

// Login user
export const loginUserHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const input: IUserLoginInput = req.body
    const { accessToken } = await loginUser(input)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: {
        accessToken,
      },
    })
  }
)

// Get all users
export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await getAllUsersFromService()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully!',
    data: users,
  })
})

// Get a single user by ID
export const getUserByIdHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id
    const user = await getUserById(userId)
    if (!user) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User not found!',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully!',
        data: user,
      })
    }
  }
)

// Update a user
export const updateUserHandler: RequestHandler<{ id: string }> = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id
    const updatedUserData: IUpdateProfileInput = req.body
    const updatedUser = await updateUser(userId, updatedUserData)
    if (!updatedUser) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User not found!',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User updated successfully!',
        data: updatedUser,
      })
    }
  }
)

// Delete a user
export const deleteUserHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.id
    const deletedUser = await deleteUser(userId)
    if (!deletedUser) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User not found!',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully!',
        data: deletedUser,
      })
    }
  }
)
