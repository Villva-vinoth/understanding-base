const orderModel = require("../../model/order.model");
const { orderValidate } = require("../../utils/validate");
const { validationError } = require("../../utils/customError");
const { transactions } = require("../../utils/transaction");
const { filter } = require("../../utils/filterOption");
const { Op } = require("sequelize");

module.exports = {
  createOrders: async (data) => {
    return transactions(async (t)=>{
        const { error, value } = orderValidate.validate(data);
        if (error) {
          throw new validationError(error.details[0].message, 422);
        }
        const order = await orderModel.create(value, { transaction: t });
        console.log("order completed");
        return order;  
    });
  },
  getOrders: async (data) => {
    console.log(data)
    const pg =  filter(data);
    console.log("pg",pg)
    return await transactions(async (t) => {
      const orders = await orderModel.findAndCountAll(
       pg,
        {transaction: t});
      return orders;
    });
  },
  getOrderById: async (data) => {
    return await transactions(async (t) => {
      const order = await orderModel.findOne({where:{order_id:data.id}},{transaction: t});
      return order;
    });
  },
};
