const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Order = require('../models/Order');
const Product = require('../models/Product');

// @route     GET api/orders
// @desc      Get all orders
// @access    Private
router.get('/', auth, [], async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
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

// @route     POST api/order
// @desc      Add new order
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('product', 'Product ID is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { product, productName, qty, category, price, status, to_name, to_phone, address, date } = req.body;

    let productItem = await Product.findById(product);

    if (!productItem || productName !== productItem.name) {
      return res.status(400).json({ msg: 'Invalid Product' });
    }


    try {
      const newOrder = new Order({
        product, productName, qty, category, price, status, to_name, to_phone, address, date,
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

// @route     GET api/orders/:id
// @desc      Get an order
// @access    Private
router.get('/:id', auth, async (req, res) => {

  try {
    let order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ msg: 'Order not found' });


    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;