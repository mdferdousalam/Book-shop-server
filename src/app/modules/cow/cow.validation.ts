import { z } from 'zod'
import { Request, Response, NextFunction } from 'express'

const cowSchema = z.object({
  name: z.string().min(2).max(50),
  age: z.number().positive(),
  price: z.number().positive(),
  location: z.enum([
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
  ]),
  breed: z.enum([
    'Brahman',
    'Nellore',
    'Sahiwal',
    'Gir',
    'Indigenous',
    'Tharparkar',
    'Kankrej',
  ]),
  weight: z.number().positive(),
  label: z.enum(['for sale', 'sold out']).default('for sale'),
  category: z.enum(['Dairy', 'Beef', 'Dual Purpose']),
  seller: z.string(),
})

// Middleware for validating the request body against the cowSchema
const validateCow = (req: Request, res: Response, next: NextFunction) => {
  try {
    cowSchema.parse(req.body)
    next()
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export { cowSchema, validateCow }
