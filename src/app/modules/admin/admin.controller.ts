import { Request, Response } from 'express'
import { createAdmin, adminLogin } from '../admin/admin.service'
import { ICreateAdminInput, IAdminLoginInput } from './admin.interface'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'
import config from '../../../config'

//create new admin
export const createAdminHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const input: ICreateAdminInput = req.body
    const admin = await createAdmin(input)

    res.cookie('refreshToken', admin.refreshToken, {
      httpOnly: true,
      secure: config.env === 'production',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })

    if ('refreshToken' in admin) {
      delete admin.refreshToken
    }

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin created successfully',
      data: admin,
    })
  }
)

export const adminLoginHandler: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const input: IAdminLoginInput = req.body
    const { accessToken } = await adminLogin(input)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Admin logged in successfully',
      data: {
        accessToken,
      },
    })
  }
)
export const AdminController = {
  createAdminHandler,
  adminLoginHandler,
}
