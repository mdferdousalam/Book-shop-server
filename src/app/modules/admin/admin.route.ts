import express from 'express'

import {
  createAdminHandler,
  adminLoginHandler,
} from '../admin/admin.controller'

const router = express.Router()

router.post('/create-admin', createAdminHandler)
router.post('/login', adminLoginHandler)

export const AdminRoutes = router
