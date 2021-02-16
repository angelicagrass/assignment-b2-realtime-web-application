/**
 * Module for the IssueController.
 *
 * @author Angelica Grass
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class HookController {
  /**
   * Recieves a Webhook, validates it and sends it to Tasks Create Controller.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    req.body = {
      description: req.body.object_attributes.description,
      title: req.body.object_attributes.title,
      id: req.body.object_attributes.id,
      avatar: req.body.user.avatar_url,
      state: req.body.object_attributes.state === 'opened',
      action: req.body.object_attributes.action
    }

    next()
  }

  /**
   * Recieves a Webhook, validates it and sends it to Tasks Create Controller.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async updateIssue (req, res, next) {
    try {
      res.io.emit('issue', {
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        id: req.body.id,
        action: req.body.action,
        state: req.body.state
      })

      if (req.headers['x-gitlab-event']) {
        res.status(200).send('Hook accepted')
        return
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Authorizes the webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  authorize (req, res, next) {
    // Validate the Gitlab Secret Token to be sure that the hook is from the correct sender.
    // This need to be in a database if we have multiple users.
    if (req.headers['x-gitlab-token'] !== process.env.HOOK_SECRET) {
      res.status(403).send('Incorrect Secret')
      return
    }

    next()
  }
}
