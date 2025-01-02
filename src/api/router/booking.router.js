const router = require('express').Router();
const upload = require('../../config/multer');
const { getAllBookings, createBulk } = require('../controller/booking.controller');

router.get('/getAllBookings',getAllBookings);
router.post('/createBulk',upload.single('file'),createBulk);

module.exports = router