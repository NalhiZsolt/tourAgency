const createError = require('http-errors')
const logger = require('../../config/logger')
const travellersService = require('./travellers.service')
const Traveller = require('../../models/travellers')

exports.getAllTraveller = (req, res, next) => {
  return travellersService.findAllTraveller()
    .then(travellerList => {
      logger.info(`Sent guide list with ${travellerList.length} pcs guide`)
      res.json(travellerList)
    })
    .catch(err => {
      logger.error(err)
      return next(new createError.InternalServerError(`Couldn't send guide List`))
    })
}

exports.getTravellerById = (req, res, next) => {
  const id = req.params.id
  return travellersService.findOneTraveller(id)
    .then(traveller => {
      if (!traveller) {
        return next(new createError.NotFound(`Couldn't find traveller with ${id} ID`))
      }
       res.json(traveller)
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Traveller not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}

exports.createNewTraveller = (req, res, next) => {
  const {first_name, last_name, age, password, email, gender, city, street, houseNumber, zip, image, my_tours, role} = req.body
  if (!first_name || !last_name || !age || !password || !email || !gender || !city || !street || !houseNumber || !zip || !image || !role) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const newTraveller = {
      first_name,
      last_name,
      email,
      age,
      gender,
      image,
      password: Traveller.hashPassword(password),
      city,
      street,
      houseNumber,
      zip,
      my_tours,
      role
  }

  return travellersService.createTraveller(newTraveller)
    .then(newTravellerData => res.status(201).json(newTravellerData))
    .catch(err => {
      logger.error(err)
      return next(new createError.InternalServerError(`Couldn't save new Traveller`))
    })
}

exports.updateTraveller = (req, res, next) => {
  const id = req.params.id
  const {first_name, last_name, age, password, email, gender, city, street, houseNumber, zip, image, my_tours, role} = req.body

  if (!first_name || !last_name || !age || !password || !email || !gender || !city || !street || !houseNumber || !zip || !image || !role) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const updatedTraveller = {
    first_name,
    last_name,
    email,
    age,
    gender,
    image,
    password,
    city,
    street,
    houseNumber,
    zip,
    my_tours,
    role
  }

  return travellersService.updateTraveller(id, updatedTraveller)
    .then(updatedData => {
      
      logger.debug(`${new Date().toUTCString()}, ${updatedData} Traveller updated with ID: ${id}`);
      res.status(200)
      res.json(updatedData)
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Traveller not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}

exports.updateTravellerPassword = (req, res, next) => {
  const id = req.params.id
  const {first_name, last_name, age, password, email, gender, city, street, houseNumber, zip, image, my_tours, role} = req.body

  if (!first_name || !last_name || !age || !password || !email || !gender || !city || !street || !houseNumber || !zip || !image || !role) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const updatedTraveller = {
    first_name,
      last_name,
      email,
      age,
      gender,
      image,
      password: Traveller.hashPassword(password),
      city,
      street,
      houseNumber,
      zip,
      my_tours,
      role
  }

  return travellersService.updateTraveller(id, updatedTraveller)
    .then(updatedData => {
      
      logger.debug(`${new Date().toUTCString()}, ${updatedData} Traveller updated with ID: ${id}`);
      res.json(updatedData)
      res.status(200)
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Traveller not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}

exports.deleteTraveller = (req, res, next) => {
  const id = req.params.id
  return travellersService.deleteTraveller(id)
    .then(deletedTraveller => {
      if (!deletedTraveller) {
        return next(new createError.NotFound(`Couldn't send traveller with ${req.params.id} ID`))
      }
      res.json(deletedTraveller[0])
      logger.debug(`${new Date().toUTCString()}, method: ${req.method}, path: ${req.originalUrl}, Traveller deleted with ${id} ID`);
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Traveller not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}
