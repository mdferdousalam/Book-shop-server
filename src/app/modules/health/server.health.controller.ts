import { Request, Response, NextFunction } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'



// Get server health
export const getHealth: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Server is running successfully',
        data: null,
      })
    } catch (error) {
      next(error)
    }
  }
)





