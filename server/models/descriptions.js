const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const descriptionsSchema = new mongoose.Schema({
  "value": String,
  "name": String,
  "description1": String,
  "description2": String,
  "description3": String,
  "header1": String,
  "header2": String,
  "header3": String,
  "img1":String,
  "img2":String,
  "img3": String
});

descriptionsSchema.plugin(idValidator);
const Descriptions = mongoose.model('Descriptions', descriptionsSchema, 'descriptions');

module.exports = Descriptions;
