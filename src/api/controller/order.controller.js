const { sequelize } = require('../../config');
const {createOrders, getOrders, getOrderById} = require('../service/order.service')
module.exports={
    createOrders:async ( req, res,next)=>{
        try {
           
            const data = req.body;
            const order = await createOrders(data)
            // console.log(order)
            return res.status(200).json({message:'Created SuccessFully !',order:order.order_id})
        } catch (error) {
            next(error)
        }
    },
    getOrders:async ( req, res,next)=>{
        try {
            const data = req.body;
            const orders = await getOrders(data);
            return res.status(200).json({message:'Records Fetched SuccessFully !',data: orders})
        } catch (error) {
            next(error)
        }
    },
    getOrderById:async ( req, res,next)=>{
        try {
            const data = req.params;
            const order = await getOrderById(data);
            return res.status(200).json({message:'Record Fetched SuccessFully !',data: order})
        } catch (error) {
            next(error)
        }
    },
}