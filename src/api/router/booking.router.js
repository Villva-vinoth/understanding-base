const router = require('express').Router();
const {upload} = require('../../config/multer');
const { getAllBookings, createBulk, deleteBulk, updateBulk, createExcelBulk } = require('../controller/booking.controller');

router.get('/getAllBookings',getAllBookings);
router.post('/createBulk',upload.single('file'),createBulk);
router.post('/deleteBulk',deleteBulk);
router.post('/updateBulk',updateBulk);

module.exports = router