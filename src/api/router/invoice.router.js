const { getAllInvoice, getInvoiceById, getInvoiceByOrderId } = require('../controller/invoice.controller');

const router = require('express').Router();

router.post('/getAllInvoices',getAllInvoice);
router.get('/getInvoiceById/:id',getInvoiceById);
router.get('/getInvoiceByOrderId/:id',getInvoiceByOrderId);

module.exports = router