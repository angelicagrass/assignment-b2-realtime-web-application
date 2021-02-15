/**
 * Module for the PureSnippetController.
 *
 * @author Angelica Grass
 * @version 1.0.0
 */

import fetch from 'node-fetch'
// import express from 'express'
import moment from 'moment'
// import { PureSnippet } from '../models/home-model.js'
// import { UserInfo } from '../models/user-model.js'

/**
 * Encapsulates a controller.
 */
export class IssueController {
  /**
   * Displays a list of snippets.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index(req, res, next) {
    console.log('INDEX')
    console.log(process.env.BEARER_TOKEN)
    console.log(process.env.GIT_PROJECT)

    try {
      let gitIssues = await fetch('https://gitlab.lnu.se/api/v4/projects/12695/issues', {
        method: 'GET',
        contentType: 'application/json',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      })
      gitIssues = await gitIssues.json()

      console.log(gitIssues)

      const viewData = {
        issues: gitIssues
          .filter(issue => (issue.title !== 'REMOVE'))
          .map(issue => ({
            title: issue.title,
            description: issue.description,
            avatar: issue.author.avatar_url,
            id: issue.id,
            iid: issue.iid,
            updated: moment(issue.updated_at),
            state: issue.state === 'opened'
          }))
          .sort((a, b) => b.updated - a.updated)
          .sort((a, b) => b.state - a.state)
      }

      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    console.log('REMOVE-----------------------------------------')

    try {
      await fetch(`${process.env.GIT_PROJECT + req.body.value}?state_event=close`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      })
      // res.redirect('.')
      res.redirect('/')
    } catch (error) {
      next(error)
    }
  }


  async comment(req, res, next) {
    console.log('COMMENT--------------------')

  


  }
}
