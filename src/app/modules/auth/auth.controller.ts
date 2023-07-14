import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { createUser as createUserFromService } from '../user/user.service'
import { ICreateUserInput } from '../user/user.interface'
import config from '../../../config'
import { getRefreshToken } from './auth.service'

// Create a new user
export const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData: ICreateUserInput = req.body
    const result = await createUserFromService(userData)
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

// Get Refresh Token
export const getRefreshTokenHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies
    const response = await getRefreshToken(refreshToken)

    res.cookie('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: config.env === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'New access token generated successfully!',
      data: {
        accessToken: response.accessToken,
      },
    })
  }
)

export const AuthController = {
  createUser,
  getRefreshTokenHandler,
}
