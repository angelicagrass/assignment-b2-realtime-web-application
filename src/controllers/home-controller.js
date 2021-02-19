/**
 * Module for the IssueController.
 *
 * @author Angelica Grass
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import moment from 'moment'

/**
 * Encapsulates a controller.
 */
export class IssueController {
  /**
   * Displays a list of issues from Gitlab.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async index (req, res, next) {
    try {
      let gitIssues = await fetch(`${process.env.GIT_PROJECT}`, {
        method: 'GET',
        contentType: 'application/json',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      })
      gitIssues = await gitIssues.json()

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
            state: issue.state === 'opened',
            // comment: issue.note
          }))
          .sort((a, b) => b.updated - a.updated)
          .sort((a, b) => b.state - a.state)
      }

      // Push issue.ID into array.
      const arrayID = []

      viewData.issues.forEach((issue) => {
        arrayID.push(issue.iid)
      })

      // Fetch notes from every issue by ID from viewData
      const viewNote = await Promise.all(arrayID.map(ID =>
        fetch(`${process.env.GIT_PROJECT}${ID}/notes`, {
          method: 'GET',
          contentType: 'application/json',
          headers: {
            Authorization: `Bearer ${process.env.BEARER_TOKEN}`
          }
        }).then((response) => {
          return response.json()
        })
      )).then((data) => {
        return data
      })

      const notePromise = await viewNote.flat()

      // Map out the id and comment
      const dataNote = {
        notes: notePromise
          .map(notes => ({
            note: notes.body,
            id: notes.noteable_iid
          }))
      }

      viewData.issues.forEach((data) => {
        dataNote.notes.forEach((note) => {
          if (data.iid === note.id) {
            data.note = note.note
          }
        })
      })
      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Close snippet.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async remove (req, res, next) {
    try {
      await fetch(`${process.env.GIT_PROJECT + req.body.value}?state_event=close`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      })
      res.redirect('/')
    } catch (error) {
      next(error)
    }
  }

  /**
   * Post comment to gitlab.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async comment (req, res, next) {
    try {
      await fetch(`${process.env.GIT_PROJECT + req.body.value}/notes?body=${req.body.text}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`
        }
      })
      res.redirect('.')
    } catch (error) {
      next(error)
    }
  }
}
