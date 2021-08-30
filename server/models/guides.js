const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const guidesSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    minLength: 2,
    required: true
  },
  last_name: {
    type: String,
    trim: true,
    minLength: 2,
    required: true
  },
  age: {
    type: Number,
    min: 18,
    max: 99,
    trim: true,
    required: true
  },
  image: String,
  tours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tours"
  }],
  description1: {
    type: String,
    required: true
  },
  description2: String,

}, {
  timestamps: true
});

guidesSchema.plugin(idValidator);
const Guides = mongoose.model('Guides', guidesSchema, 'guides');

module.exports = Guides;
