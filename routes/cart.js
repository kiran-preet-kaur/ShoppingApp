const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Cart = require('../models/Cart');
const Product = require('../models/Product');

updateCartItem = async (id, qty) => {

  // Build cart object
  const cartFields = {};
  if (qty) cartFields.qty = qty;

  cartItem = await Cart.findByIdAndUpdate(
    id,
    { $set: cartFields },
    { new: true },
  );

  let response = {};
  let productItem = await Product.findById(cartItem.product);

  response._id = cartItem._id;
  response.productID = cartItem.product;
  response.qty = cartItem.qty;
  response.productName = productItem.name;
  response.productPrice = productItem.price;
  response.productImage = productItem.image;
  return response;
}

// @route     GET api/cart
// @desc      Get all cart products
// @access    Private
router.get('/', auth, [], async (req, res) => {
  try {
    const cartProducts = await Cart.find({ user: req.user.id }).sort({
      date: 1,
    });

    if (cartProducts.length < 1) {
      return res.status(404).send('Empty cart');
    }

    let response = [];
    for (let i = 0; i < cartProducts.length; i++) {
      let item = {};
      let productItem = await Product.findById(cartProducts[i].product);
      item._id = cartProducts[i]._id;
      item.productID = cartProducts[i].product;
      item.qty = cartProducts[i].qty;
      item.productName = productItem.name;
      item.productPrice = productItem.price;
      item.productImage = productItem.image;
      response.push(item);
    }

    res.json(response);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/cart
// @desc      Add new item in cart
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('product', 'Product ID is required')
        .not()
        .isEmpty()
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { product, qty, date } = req.body;

    let productItem = await Product.findById(product);

    if (!productItem) {
      return res.status(400).json({ msg: 'Invalid Product' });
    }

    if (qty == "") {
      qty = 1
    }

    let cartItem = await Cart.findOne({ product });

    if (cartItem) {
      cartItem = await updateCartItem(cartItem._id, qty ? cartItem.qty + (qty - 0) : cartItem.qty + 1);
      return res.status(200).json(cartItem);
    }

    try {
      const newItem = new Cart({
        product, qty, date,
        user: req.user.id,
      });

      const item = await newItem.save();

      let response = {};

      response._id = item._id;
      response.productID = item.product;
      response.qty = item.qty;
      response.productName = productItem.name;
      response.productPrice = productItem.price;
      response.productImage = productItem.image;


      res.json(response);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/cart/:id
// @desc      Update cart item
// @access    Private
router.put('/:id', auth, async (req, res) => {

  try {
    let cartItem = await Cart.findById(req.params.id);

    if (!cartItem) return res.status(404).json({ msg: 'Item not found' });

    cartItem = await updateCartItem(req.params.id, req.body.qty);

    res.json(cartItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/cart/:id
// @desc      Delete cart item
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let cartItem = await Cart.findById(req.params.id);
    let productItem = await Product.findById(cartItem.product);

    if (!cartItem) return res.status(404).json({ msg: 'Item not found' });

    await Cart.findByIdAndRemove(req.params.id);

    res.json({ _id: req.params.id, qty: cartItem.qty, productPrice: productItem.price, msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/cart
// @desc      Delete cart
// @access    Private
router.delete('/', auth, async (req, res) => {
  try {

    await Cart.deleteMany({ user: req.user.id });

    res.json({ msg: 'Cart empty' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;