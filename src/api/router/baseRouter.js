const router = require('express').Router();
const userRouter = require('./user.router')
const orderRouter = require('./order.router')

router.use('/users',userRouter);
router.use('/orders',orderRouter);

module.exports = router