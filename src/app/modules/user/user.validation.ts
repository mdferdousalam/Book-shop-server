import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userSchema = z.object({
    firstName: z.string().min(2).max(50).nonempty(),
    lastName: z.string().min(2).max(50).nonempty(),
    password: z.string().min(6).max(30).nonempty(),
  })

  try {
    const validatedData = userSchema.parse(req.body)
    req.body = validatedData
    next()
  } catch (error) {
    res.status(400).json({ error: 'Validation error', details: error })
  }
}
