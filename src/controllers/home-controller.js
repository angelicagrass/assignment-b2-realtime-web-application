/**
 * Module for the PureSnippetController.
 *
 * @author Angelica Grass
 * @version 1.0.0
 */

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

    // Få in issues här

    
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
    res.render('issues/index')
    // } catch (error) {
    //   next(error)
    // }
  }
}
