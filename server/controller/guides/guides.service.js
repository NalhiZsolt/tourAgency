const Guides = require('../../models/guides')

exports.createGuide = (guide) => {
  const newGuide = new Guides(guide)
  return newGuide.save()
}

exports.findAllGuide = () => Guides.find()

exports.findOneGuide = (id) => Guides.findById(id)

exports.updateGuide = (id, updatedData) => Guides.findByIdAndUpdate(id, updatedData, {new: false})

exports.deleteGuide = (id) => Guides.findByIdAndDelete(id)
