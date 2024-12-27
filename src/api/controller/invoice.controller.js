const { sequelize } = require('../../config');
const { getAllInvoice, getInvoiceById, getInvoiceByOrderId } = require('../service/invoice.service');
module.exports={
    getAllInvoice:async ( req, res,next)=>{
        try {
           
            const data = req.body;
            const invoices = await getAllInvoice(data)
            return res.status(200).json({message:'Records Fetched SuccessFully !',data:invoices})
        } catch (error) {
            next(error)
        }
    },
    getInvoiceById:async ( req, res,next)=>{
        try {
            const data = req.params;
            const invoice = await getInvoiceById(data);
            return res.status(200).json({message:'Record Fetched SuccessFully !',data: invoice})
        } catch (error) {
            next(error)
        }
    },
    getInvoiceByOrderId:async ( req, res,next)=>{
        try {
            const data = req.params;
            const invoice = await getInvoiceByOrderId(data);
            return res.status(200).json({message:'Record Fetched SuccessFully !',data: invoice})
        } catch (error) {
            next(error)
        }
    },
}