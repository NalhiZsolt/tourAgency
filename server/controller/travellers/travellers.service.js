const Travellers = require('../../models/travellers')

exports.createTraveller = (traveller) => {
  const newTraveller = new Travellers(traveller)
  return newTraveller.save()
}

exports.findAllTraveller = () => Travellers.find()

exports.findOneTraveller = (id) => Travellers.findById(id)

exports.updateTraveller = (id, updatedData) => Travellers.findByIdAndUpdate(id, updatedData, {new: false})

exports.deleteTraveller = (id) => Travellers.findByIdAndDelete(id)
