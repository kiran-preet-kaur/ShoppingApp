const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products'
  },
  productName: {
    type: String,
    required: true
  },
  qty: {
    type: Number,
    default: 1
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    default: 0
  },
  to_name: {
    type: String,
    required: true
  },
  to_phone: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', OrderSchema);