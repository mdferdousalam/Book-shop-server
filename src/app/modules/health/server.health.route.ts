import express from 'express'
import {
  getHealth
} from './server.health.controller'
const router = express.Router()

router.get('/', getHealth)


export const ServerHealthRoute = router
