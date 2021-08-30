const express = require('express')
const routes = express.Router()

const toursController = require('./tours.controller')

const adminCheck = require('../../auth/adminOnly')
const asistantCheck = require('../../auth/asistantOnly')

const authenticationByJWT = require('../../auth/authenticate').auth

routes.post('/', authenticationByJWT, asistantCheck, (req, res, next) => {
    return toursController.createNewTour(req, res, next)
})

routes.get('/', (req, res, next) => {
    return toursController.getAllTours(req, res, next)
})

routes.get('/:id', (req, res, next) => {
    return toursController.getTourById(req, res, next)
})

routes.put('/:id', authenticationByJWT, (req, res, next) => {
    return toursController.updateTour(req, res, next)
})

routes.delete('/:id', authenticationByJWT, adminCheck, (req, res, next) => {
    return toursController.deleteTour(req, res, next)
})

module.exports = routes
