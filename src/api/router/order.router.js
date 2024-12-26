const router = require('express').Router();
const { createOrders, getOrders, getOrderById } = require('../controller/order.controller');

router.post('/createOrder',createOrders);
router.post('/getOrders',getOrders); 
router.get('/getOrderById/:id',getOrderById); 


module.exports = router