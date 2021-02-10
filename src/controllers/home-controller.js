/**
 * Module for the PureSnippetController.
 *
 * @author Angelica Grass
 * @version 1.0.0
 */

import fetch from 'node-fetch'
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
  async index (req, res, next) {
    console.log('INDEX')



    try {
      let gitIssues = await fetch('https://gitlab.lnu.se/api/v4/projects/12695/issues', {
        method: 'GET',
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer NT7jtyFyseCotkQDY-vX'
        }
      })
      gitIssues = await gitIssues.json()

      console.log(gitIssues)

      const viewData = {
        issues: gitIssues.map(issue => ({
          title: issue.title,
          description: issue.description,
          avatar: issue.author.avatar_url,
          id: issue.id,
          state: issue.state === 'opened'
        }))
      }


      res.render('issues/index', { viewData })
    } catch (error) {
      next(error)
    }

    // const data = {
    //   gitIssues: await gitIssues
    //     .map(gitIssues => ({
    //       id: gitIssues.id,
    //       title: gitIssues.title,
    //       text: gitIssues.description,
    //       avatar: gitIssues.author.avatar_url
    //     }))
    // }

    // const gitData = {
    //   gitIssues

    // }

    // gör en data här

    // try {
    //   const viewData = {
    //     loggedIn: req.session.loggedin,
    //     pureSnippet: (await PureSnippet.find({}))
    //       .map(pureSnippet => ({
    //         id: pureSnippet._id, // Id to identify the snippet at server.
    //         createdAt: moment(pureSnippet.createdAt).fromNow(), // Time when created.
    //         value: pureSnippet.value,
    //         user: pureSnippet.user,
    //         checkuser: req.session.name === pureSnippet.user, // checks if session name is equal to owner of snippet.
    //         editSnippet: req.session.editSnippet === pureSnippet.id, // checks if edit snippet is equal to id of pure snippet.
    //         text: pureSnippet.text
    //       }))
    //       .sort((a, b) => a.value - b.value)
    //   }
    //   console.log(viewData)

    // } catch (error) {
    //   next(error)
    // }
  }
}
