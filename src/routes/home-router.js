import express from 'express'
import { IssueController } from '../controllers/home-controller.js'

export const router = express.Router() // Create expressRouter

const controller = new IssueController() // Controller for puresnippet that holds the methods in home-controller.

// Map HTTP verbs and route paths to controller actions.
router.get('/', controller.index)
router.post('/remove', controller.remove)
router.post('/comment', controller.comment)
