
const express = require('express')
const routes = express.Router()

const descriptionsController = require('./descriptions.controller')

routes.get('/', (req, res, next) => {
  return descriptionsController.getAllDescriptions(req, res, next)
})
module.exports = routes
