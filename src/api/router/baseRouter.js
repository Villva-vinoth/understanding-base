const router = require('express').Router();
const userRouter = require('./user.router')
const orderRouter = require('./order.router')
const invoiceRouter = require('./invoice.router')
const bookingRouter = require('./booking.router')
router.use('/users',userRouter);
router.use('/orders',orderRouter);
router.use('/invoice',invoiceRouter);
router.use('/booking',bookingRouter);
module.exports = router