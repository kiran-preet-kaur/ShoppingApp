const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  qty: {
    type: Number,
    default: 1
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('cart', CartSchema);