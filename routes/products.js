const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../models/Product');

// @route     GET api/products
// @desc      Get all products
// @access    Public
router.get('/', [], async (req, res) => {
  try {
    let products = [];
    if (req.query.category) {
      products = await Product.find({ category: req.query.category }).sort({
        date: -1,
      });
    } else {
      products = await Product.find().sort({
        date: -1,
      });
    }

    if (products.length < 1) {
      return res.status(404).send('No products found');
    }

    res.json(products);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/products
// @desc      Add new product
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else if (req.user.type != "admin") {
      return res.status(401).json({ msg: "Not authorised!" });
    }

    const { name, description, category, price } = req.body;

    try {
      const newProduct = new Product({
        name,
        description,
        category,
        price,
        user: req.user.id,
      });

      const product = await newProduct.save();

      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/products/:id
// @desc      Update product
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, description, category } = req.body;

  // Build product object
  const productFields = {};
  if (name) productFields.name = name;
  if (description) productFields.description = description;
  if (category) productFields.category = category;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Make sure an admin is making the request
    if (req.user.type != "admin") {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true },
    );

    res.json(product);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/products/:id
// @desc      Delete product
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Make sure an admin is making the request
    if (req.user.type != "admin") {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Product.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/products/:id
// @desc      Get a product
// @access    Public
router.get('/:id', async (req, res) => {

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });


    res.json(product);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;