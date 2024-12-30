const { filter } = require("../../utils/filterOption");
const invoiceModel = require("../../model/invoice.model");
const orderModel = require("../../model/order.model");
const userModel = require("../../model/user.model");
const { transactions } = require("../../utils/transaction");
const { NotFoundError } = require("../../utils/customError");

module.exports = {
  getAllInvoice: (data) => {
    const pg = filter(data);
    return transactions(async (t) => {
      const invoices = await invoiceModel.findAndCountAll(pg, {
        transaction: t,
      });
      return invoices;
    });
  },
  getInvoiceById: (data) => {
    return transactions(async (t) => {
      const invoice = await invoiceModel.findOne({
        where: { invoice_id: data.id },
        transaction: t,
      });
      if (!invoice) {
        throw new NotFoundError("Invoice Not Found", 404);
      }
      return invoice;
    });
  },
  getInvoiceByOrderId: (data) => {
    return transactions(async (t) => {
      const invoice = await invoiceModel.findOne({
        where: { order_id: data.id },
        include: [
          { model: orderModel, as: "order_invoices" },
          { model: userModel, as: "user_invoices" },
        ],
        transaction: t,
      });
      if (!invoice) {
        throw new NotFoundError("Invoice Not Found", 404);
      }
      return invoice;
    });
  },
  downloadInvoice: (data) => {
    return transactions(async (t) => {
      const invoice = await invoiceModel.findOne({
        where: { invoice_id: data.id },
        include: [
          {
            model: orderModel,
            as: "order_invoices",
          },
          {
            model: userModel,
            as: "user_invoices",
          },
        ],
      });
      if (!invoice) {
        throw new NotFoundError("Invoice Not Found", 404);
      }
    return invoice;
    });
  },
};
