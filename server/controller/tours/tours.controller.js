const createError = require('http-errors')
const logger = require('../../config/logger')
const toursService = require('./tours.service')

exports.getAllTours = (req, res, next) => {
  return toursService.findAllTour()
    .then(tourList => {
      logger.info(`Sent tour list with ${tourList.length} pcs tour`)
      res.json(tourList)
    })
    .catch(err => {
      logger.error(err)
      return next(new createError.InternalServerError(`Couldn't send tour List`))
    })
}

exports.getTourById = (req, res, next) => {
  const id = req.params.id

  return toursService.findOneTour(id)
    .then(tour => {
      if (!tour) {
        return next(new createError.NotFound(`Tour not found with this ID: ${id}`))
      }
      res.json(tour)
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Tour not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}

exports.createNewTour = (req, res, next) => {
  const {tour_title, tour_description, tour_description2, tour_description3, tour_type, tour_start, tour_end, travellers, image, guide, tour_location} = req.body
  if (!tour_title || !tour_description || !tour_type || !tour_start || !tour_end || !guide || !tour_location) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const newTour = {
    tour_title,
    tour_description,
    tour_description2,
    tour_description3,
    tour_type,
    tour_start,
    tour_end,
    travellers,
    tour_location,
    image,
    guide
  }

  return toursService.createTour(newTour)
    .then(newTourData => res.status(201).json(newTourData))
    .catch(err => {
      logger.error(err)
      return next(new createError.InternalServerError(`Couldn't save new tour`))
    })
}

exports.updateTour = (req, res, next) => {
  const id = req.params.id
  const {tour_title, tour_description, tour_description2, tour_description3, tour_type, tour_start, tour_end, travellers, image, guide, tour_location} = req.body
  if (!tour_title || !tour_description || !tour_type || !tour_start || !tour_end || !guide || !tour_location) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const updatedTour = {
    tour_title,
    tour_description,
    tour_description2,
    tour_description3,
    tour_type,
    tour_start,
    tour_end,
    travellers,
    tour_location,
    guide,
    image
  }
  return toursService.updateTour(id, updatedTour)
    .then(updatedData => {
            
      logger.debug(`${new Date().toUTCString()}, ${updatedData} tour Updated with ID: ${id}`);
      res.json(updatedData)
      
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Tour not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
     
    })
}

exports.deleteTour = (req, res, next) => {
  const id = req. params.id
  return toursService.deleteTour(id)
    .then(deletedTour => {
      if (!deletedTour) {
        return next(new createError.NotFound(`Tour not found with this ID: ${id}`))
      }
      res.json({
        tourDeleted: true,
        id: deletedTour._id
    })
    logger.debug(`${new Date().toUTCString()}, method: ${req.method}, path: ${req.originalUrl}, tour deleted with ${id} ID`);
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Tour not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
      
    })
}
