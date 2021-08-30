const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const travellersSchema = new mongoose.Schema({

    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    gender: {type: String, required: true},
    password: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    houseNumber: {type: Number, required: true},
    zip: {type: Number, required: true},
    image: {type: String, required: true},
    my_tours: Array,
    role: Number

}, {
  timestamps: true
});


travellersSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10)
}

const Travellers = mongoose.model('Travellers', travellersSchema, 'travellers');

module.exports = Travellers

