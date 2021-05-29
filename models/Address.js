const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true
  },
  pinCode: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    default: 0
  },
  state: {
    type: String,
    required: true
  },
  addressType: {
    type: String,
    default: 'Home'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('address', AddressSchema);