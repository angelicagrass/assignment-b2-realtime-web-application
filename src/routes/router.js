import express from 'express'
import createError from 'http-errors'
import { router as issueRouter } from './home-router.js'
import { router as hookRouter } from './hook-router.js'

export const router = express.Router()

router.use('/', issueRouter)
router.use('/webhook', hookRouter)

// Catch 404 (ALWAYS keep this as the last route).
router.use('*', (req, res, next) => next(createError(404)))
