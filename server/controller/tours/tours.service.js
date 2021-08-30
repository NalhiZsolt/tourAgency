const Tours = require('../../models/tours')

exports.createTour = (tour) => {
  const newTour = new Tours(tour)
  return newTour.save()
}

exports.findAllTour = () => Tours.find()

exports.findOneTour = (id) => Tours.findById(id)

exports.updateTour = (id, updatedData) => Tours.findByIdAndUpdate(id, updatedData, {new: true})

exports.deleteTour = (id) => Tours.findByIdAndDelete(id)
