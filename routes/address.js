const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Address = require('../models/Address');
const Product = require('../models/Product');

// @route     GET api/address
// @desc      Get all address
// @access    Private
router.get('/', auth, [], async (req, res) => {
  try {
    const address = await Address.find({ user: req.user.id }).sort({
      date: 1,
    });

    if (address.length < 1) {
      return res.status(404).send('No address found');
    }

    res.json(address);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/address
// @desc      Add new address
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'name is required')
        .not()
        .isEmpty(),
      check('pinCode', 'pinCode is required')
        .not()
        .isEmpty(),
      check('phone', 'phone is required')
        .not()
        .isEmpty(),
      check('address', 'address is required')
        .not()
        .isEmpty(),
      check('city', 'city is required')
        .not()
        .isEmpty(),
      check('state', 'state is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, pinCode, phone, address, city, state, addressType } = req.body;

    try {
      const newAddress = new Address({
        name, pinCode, phone, address: req.body.address, city, state, addressType,
        user: req.user.id,
      });

      const address = await newAddress.save();

      res.json(address);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/address/:id
// @desc      Update address
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { name, pinCode, phone, address, city, state, addressType } = req.body;

  // Build order object
  const addressFields = {};
  if (name) addressFields.name = name;
  if (pinCode) addressFields.pinCode = pinCode;
  if (phone) addressFields.phone = phone;
  if (address) addressFields.address = address;
  if (city) addressFields.city = city;
  if (state) addressFields.state = state;
  if (addressType) addressFields.addressType = addressType;

  try {
    let address = await Address.findById(req.params.id);

    if (!address) return res.status(404).json({ msg: 'Address not found' });

    address = await Address.findByIdAndUpdate(
      req.params.id,
      { $set: addressFields },
      { new: true },
    );

    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/address/:id
// @desc      Delete address
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let address = await Address.findById(req.params.id);

    if (!address) return res.status(404).json({ msg: 'Address not found' });

    await Address.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Address removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/address/:id
// @desc      Get a address
// @access    Public
router.get('/:id', async (req, res) => {

  try {
    let address = await Address.findById(req.params.id);

    if (!address) return res.status(404).json({ msg: 'Product not found' });


    res.json(address);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;


module.exports = router;