const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @route     POST api/payments
// @desc      Regiter a user
// @access    Public
router.post(
  '/verification',
  async (req, res) => {

    const secret = "bhgy23456";
    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    try {
      if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        payment = new Payment({ payment: req.body })
        await payment.save();

        let order = await Order.findOne({ razorpayOrderID: req.body.payload.payment.entity.order_id });

        await Order.findByIdAndUpdate(
          order._id,
          {
            paymentID: req.body.payload.payment.entity.id,
            status: 1,
            isPaid: true,
            paidAt: req.body.payload.payment.entity.created_at
          },
          { new: true },
        );
      } else {
        // pass it
      }

    } catch (err) {
      console.log(err.message);
    }


    res.json({ "status": "ok" })
  }
);

module.exports = router;