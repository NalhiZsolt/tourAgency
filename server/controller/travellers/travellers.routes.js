const express = require('express')
const routes = express.Router()

const travellerController = require('./travellers.controller')
const adminCheck = require('../../auth/adminOnly')
const asistantCheck = require('../../auth/asistantOnly')
const authenticationByJWT = require('../../auth/authenticate').auth

routes.post('/', (req, res, next) => {
    return travellerController.createNewTraveller(req, res, next)
})

routes.get('/', (req, res, next) => {
    return travellerController.getAllTraveller(req, res, next)
})

routes.get('/:id', (req, res, next) => {
    return travellerController.getTravellerById(req, res, next)
})

routes.put('/:id', (req, res, next) => {
    return travellerController.updateTraveller(req, res, next)
})

routes.put('/:id/password', (req, res, next) => {
    return travellerController.updateTravellerPassword(req, res, next)
})
// 
routes.delete('/:id', authenticationByJWT, adminCheck, (req, res, next) => {
    return travellerController.deleteTraveller(req, res, next)
})

module.exports = routes
