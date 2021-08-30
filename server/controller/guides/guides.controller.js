const createError = require('http-errors')
const logger = require('../../config/logger')
const guidesService = require('./guides.service')

exports.getAllGuides = (req, res, next) => {
  return guidesService.findAllGuide()
    .then(guideList => {
      logger.info(`Sent guide list with ${guideList.length} pcs guide`)
      res.json(guideList)
    })
    .catch(err => {
      logger.error(err)
      return next(new createError.InternalServerError(`Couldn't send guide List`))
    })
}

exports.getGuideById = (req, res, next) => {
  const id = req.params.id
  return guidesService.findOneGuide(id)
    .then(guide => {
      if (!guide) {
        return next(new createError.NotFound(`Guide not found with this ID: ${id}`))
      }
      res.json(guide)
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Guide not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}

exports.createNewGuide = (req, res, next) => {
  const {first_name, last_name, age, image, description1, description2, tours} = req.body
  if (!req.body['first_name'] || !req.body['last_name'] || !req.body['age'] || !req.body['image'] || !req.body['description1']) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const newGuide = {
    first_name,
    last_name,
    age,
    image,
    description1,
    description2,
    tours
  }

  return guidesService.createGuide(newGuide)
    .then(newGuideData => res.status(201).json(newGuideData))
    .catch(err => {
      logger.error(err)
      return next(new createError.InternalServerError(`Couldn't save new guide`))
    })
}

exports.updateGuide = (req, res, next) => {
  const id = req.params.id
  const {first_name, last_name, age, image, description1, description2, tours} = req.body
  if (!req.body['first_name'] || !req.body['last_name'] || !req.body['age'] || !req.body['image'] || !req.body['description1'] || !req.body['description2']) {
    logger.error(`${new Date().toUTCString()} Invalid request body: ${JSON.stringify(req.body)}`);
    return next(new createError.BadRequest('Invalid request body!'));
  }

  const updatedGuide = {
    first_name,
    last_name,
    age,
    image,
    description1,
    description2,
    tours
  }

  return guidesService.updateGuide(id, updatedGuide)
    .then(updatedData => {
      
      logger.debug(`${new Date().toUTCString()}, ${updatedData} guide updated with ID: ${id}`);
      res.json(updatedData)
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Guide not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}

exports.deleteGuide = (req, res, next) => {
  const id = req. params.id
  return guidesService.deleteGuide(id)
    .then(deletedGuide => {
      if (!deletedGuide) {
        return next(new createError.NotFound(`Guide not found with this ID: ${id}`))
      }
      res.json({
        guideDeleted: true,
        id: deletedGuide.id
    })
    logger.debug(`${new Date().toUTCString()}, method: ${req.method}, path: ${req.originalUrl}, guide deleted with ${id} ID`);
    })
    .catch(err => {
      logger.error(err)
      if(err.kind === "ObjectId") {
        return next(new createError.NotFound(`Guide not found with this ID: ${id}`))
      } else {
        return next(new createError.InternalServerError(err.message))
      }
    })
}
