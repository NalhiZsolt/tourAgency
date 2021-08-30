const mongoose = require('mongoose');


const toursSchema = new mongoose.Schema({
  tour_title: {
    type: String,
    trim: true,
    minLength: 2,
    required: true
  },
  tour_description: {
    type: String,
    trim: true,
    minLength: 2,
    required: true
  },
  tour_description2: String,
  tour_description3: String,

  tour_type: {
    type: String,
    required: true
  },
  tour_location: {
    type: String,
    required: true
  },
  tour_start: {
    type: Date,
    required: true
  },
  tour_end: {
    type: Date,
    required: true
  },
  travellers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Travellers"
  }],
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guides"
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const Tours = mongoose.model('Tours', toursSchema, 'tours');

module.exports = Tours;
