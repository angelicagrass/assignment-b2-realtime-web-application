import express from 'express'
import { HookController } from '../controllers/hook-controller.js'

export const router = express.Router()
const controller = new HookController()

// Map HTTP verbs and route paths to controller actions.
router.post('/issue', controller.authorize, controller.index, controller.updateIssue)
