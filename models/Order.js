const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  currency: {
    type: String,
    default: "INR"
  },
  paymentID: {
    type: String
  },
  razorpayOrderID: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'address'
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  deliveredAt: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', OrderSchema);