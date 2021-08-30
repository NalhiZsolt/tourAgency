const createError = require('http-errors')
const logger = require('../../config/logger')
const descriptionsService = require('./descriptions.service')

exports.getAllDescriptions = (req, res, next) => {
  return descriptionsService.findAllDescription()
    .then(descriptionList => {
      logger.info(`Sent guide list with ${descriptionList.length} pcs guide`)
      res.json(descriptionList)
    })
    .catch(err => {
      logger.error(err)
      return next(new createError[500](`Couldn't send descriptions`))
    })
}
