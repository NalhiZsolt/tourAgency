const express = require('express')
const routes = express.Router()

const guidesController = require('./guides.controller')
const adminCheck = require('../../auth/adminOnly')
const asistantCheck = require('../../auth/asistantOnly')
const authenticationByJWT = require('../../auth/authenticate').auth

routes.post('/', authenticationByJWT, asistantCheck, (req, res, next) => {
    return guidesController.createNewGuide(req, res, next)
})

routes.get('/', (req, res, next) => {
    return guidesController.getAllGuides(req, res, next)
})

routes.get('/:id', (req, res, next) => {
    return guidesController.getGuideById(req, res, next)
})

routes.put('/:id', authenticationByJWT, asistantCheck, (req, res, next) => {
    return guidesController.updateGuide(req, res, next)
})

routes.delete('/:id', authenticationByJWT, adminCheck, (req, res, next) => {
    return guidesController.deleteGuide(req, res, next)
})

module.exports = routes
