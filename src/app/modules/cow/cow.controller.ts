import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { RequestHandler } from 'express-serve-static-core'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import {
  createCow as createCowService,
  getAllCows as getAllCowsService,
  getCowById as getCowByIdService,
  updateCow as updateCowService,
  deleteCow as deleteCowService,
} from './cow.service'

// Create a new cow
export const createCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowData = req.body
    const createdCow = await createCowService(cowData)
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Cow created successfully!',
      data: createdCow,
    })
  }
)

// Get all cows
export const getAllCows: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cows = await getAllCowsService()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows retrieved successfully!',
      data: cows,
    })
  }
)

// Get a single cow by ID
export const getCowById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowId = req.params.id
    const cow = await getCowByIdService(cowId)
    if (!cow) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Cow not found!',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow retrieved successfully!',
        data: cow,
      })
    }
  }
)

// Update a cow
export const updateCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowId = req.params.id
    const updatedCowData = req.body
    const updatedCow = await updateCowService(cowId, updatedCowData)
    if (!updatedCow) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Cow not found!',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow updated successfully!',
        data: updatedCow,
      })
    }
  }
)

// Delete a cow
export const deleteCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cowId = req.params.id
    const deletedCow = await deleteCowService(cowId)
    if (!deletedCow) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Cow not found!',
        data: null,
      })
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cow deleted successfully!',
        data: deletedCow,
      })
    }
  }
)

export const CowController = {
  createCow,
  getAllCows,
  getCowById,
  updateCow,
  deleteCow,
}
