const express = require('express');
const Razorpay = require('razorpay');
const shortid = require('shortid');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Order = require('../models/Order');
const Product = require('../models/Product');
const Address = require('../models/Address');
const Cart = require('../models/Cart');

const razorpay = new Razorpay({
  key_id: 'rzp_test_gDfZhUosqReZUz',
  key_secret: 'UhonGejlBisAV6HicLebcv5Q'
})

// @route     GET api/orders
// @desc      Get all orders
// @access    Private
router.get('/', auth, [], async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id, isPaid: true }).sort({
      date: -1,
    });

    if (orders.length < 1) {
      return res.status(404).send('No orders found');
    }

    res.json(orders);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/orders
// @desc      Get an order
// @access    Private
router.get('/:id', auth, [], async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    const address = await Address.findById(order.address);

    let response = {
      orderItems: order.orderItems,
      toName: address.name,
      address: address.address,
      phone: address.phone,
      pinCode: address.pinCode,
      city: address.city,
      state: address.state,
      price: order.totalPrice,
      status: order.status,
      orderID: order._id,
      deliveredAt: order.deliveredAt
    }

    res.json(response);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/orders
// @desc      Create new order
// @access    Private
router.post(
  '/',
  [
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {

      const cartProducts = await Cart.find({ user: req.user.id }).sort({
        date: 1,
      });
      let orderItems = [];
      for (let i = 0; i < cartProducts.length; i++) {
        let item = {};
        let productItem = await Product.findById(cartProducts[i].product);
        item.product = cartProducts[i].product;
        item.qty = cartProducts[i].qty;
        item.name = productItem.name;
        item.price = productItem.price;
        item.image = productItem.image;
        orderItems.push(item);
      }
      // console.log(orderItems);
      const { totalPrice, status, address } = req.body;

      let AddressID = await Address.findById(address);

      if (!AddressID) {
        return res.status(400).json({ msg: 'Invalid Address' });
      }

      const payment_capture = 1
      const currency = 'INR'

      const options = {
        amount: totalPrice * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
      }


      const response = await razorpay.orders.create(options);
      // console.log(response)
      const newOrder = new Order({
        orderItems, totalPrice, status, address, currency, razorpayOrderID: response.id,
        user: req.user.id,
      });

      const order = await newOrder.save();

      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/orders/:id
// @desc      Update order
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { status } = req.body;

  // Build order object
  const orderFields = {};
  if (status) orderFields.status = status;

  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    // Make sure an admin is making the request
    if (req.user.type != "admin") {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: orderFields },
      { new: true },
    );

    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/orders/:id
// @desc      Delete order
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found' });

    // Make sure an admin is making the request
    if (req.user.type != "admin") {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Order.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;