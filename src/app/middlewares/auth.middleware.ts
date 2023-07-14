import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'

type AuthRequest = {
  user?: JwtPayload & { role: string }
} & Request

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    })
  }

  jwt.verify(token, config.secret_key as string, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
      })
    }

    req.user = decodedToken as JwtPayload & { role: string }

    next()
  })
}

export function adminOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.',
    })
  }

  next()
}

export function sellerOnly(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== 'seller') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Seller role required.',
    })
  }

  next()
}

export function buyerOnly(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'buyer') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Buyer role required.',
    })
  }

  next()
}