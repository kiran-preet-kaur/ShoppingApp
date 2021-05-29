const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  payment: {
    type: Object,
    ref: 'users'
  }
});

module.exports = mongoose.model('payment', PaymentSchema);