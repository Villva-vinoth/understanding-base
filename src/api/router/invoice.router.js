const { getAllInvoice, getInvoiceById, getInvoiceByOrderId, downloadInvoice } = require('../controller/invoice.controller');

const router = require('express').Router();

router.post('/getAllInvoices',getAllInvoice);
router.get('/getInvoiceById/:id',getInvoiceById);
router.get('/getInvoiceByOrderId/:id',getInvoiceByOrderId);
router.get('/downloadInvoice/:id',downloadInvoice);

module.exports = router