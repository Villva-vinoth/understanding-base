const orderModel = require("../../model/order.model");
const { orderValidate } = require("../../utils/validate");
const { validationError } = require("../../utils/customError");
const { transactions } = require("../../utils/transaction");
const { filter } = require("../../utils/filterOption");
const { sequelize } = require("../../config");
const userModel = require("../../model/user.model");
const invoiceModel = require("../../model/invoice.model");

module.exports = {
  createOrders: async (data) => {
    return transactions(async (t)=>{
        const { error, value } = orderValidate.validate(data);
        if (error) {
          throw new validationError(error.details[0].message, 422);
        }

        const order = await orderModel.create(value, { transaction: t });
         await invoiceModel.create({
            user_id:order.user_id,
            order_id:order.id
        },{transaction:t})
        console.log("order completed");
        return order;  
    });
  },
  getOrders: async (data) => {
    const pg =  filter(data);
    return await transactions(async (t) => {
      const orders = await orderModel.findAndCountAll(
       pg,
        {transaction: t});
      return orders;
    });
  },
  getOrderById: async (data) => {
    return await transactions(async (t) => {
      const order = await orderModel.findOne(
        {where:{order_id:data.id},
        // attributes:[[sequelize.literal('(select full_name from users where users.id = orders.user_id)'),'full_name']],
        include:[{model:userModel,as:'user',attributes:["full_name"]}],
        // logging:console.log
      }
        ,{transaction: t});
        if(!order){
            throw new Error("Order Not Found",404)
        }
        // console.log(order)
      return order;
    });
  },
};
