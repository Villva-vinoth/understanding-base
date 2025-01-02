const { sequelize } = require("../../config");
const { generateInvoice } = require("../../utils/invoicePdfHtml");
// const { generatePDF } = require('../../utils/pdf');
const {
  getAllInvoice,
  getInvoiceById,
  getInvoiceByOrderId,
  downloadInvoice,
} = require("../service/invoice.service");
const fs = require("fs");
const path = require("path");
const { fork } = require("child_process");
module.exports = {
  getAllInvoice: async (req, res, next) => {
    try {
      const data = req.body;
      const invoices = await getAllInvoice(data);
      return res
        .status(200)
        .json({ message: "Records Fetched SuccessFully !", data: invoices });
    } catch (error) {
      next(error);
    }
  },
  getInvoiceById: async (req, res, next) => {
    try {
      const data = req.params;
      const invoice = await getInvoiceById(data);
      return res
        .status(200)
        .json({ message: "Record Fetched SuccessFully !", data: invoice });
    } catch (error) {
      next(error);
    }
  },
  getInvoiceByOrderId: async (req, res, next) => {
    try {
      const data = req.params;
      const invoice = await getInvoiceByOrderId(data);
      return res
        .status(200)
        .json({ message: "Record Fetched SuccessFully !", data: invoice });
    } catch (error) {
      next(error);
    }
  },
  downloadInvoice: async (req, res, next) => {
    try {
      const data = req.params;
      const invoice = await downloadInvoice(data);
      const html = generateInvoice(invoice);
      const options = {
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      };

      const fsPath = path.join(
        __dirname,
        "../../../public/invoices/",
        `${invoice.dataValues.invoice_id}.pdf`
      );
      options.path = fsPath;

      const forked = fork(path.join(__dirname, "../../utils/pdf.js"));

      forked.send({ html, options });

      forked.on("message",  (datas) => {
        if (datas.success) {
          // res.setHeader("Content-Type", "application/pdf");
          // res.setHeader("Content-Disposition", `attachment; filename=${invoice.dataValues.invoice_id}.pdf`);
           fs.createReadStream(options.path).pipe(res);
        } else {
          next(datas.error);
        }
    
    // res.send(datas)
      });
    
      forked.on("error", (error) => {
            console.error(error);
            next(error);
          });
        
        // await generatePDF({html, options})
        
        // fs.createReadStream(fsPath).pipe(res);
      //   res.download(fsPath);
    } catch (error) {
      next(error);
    }
  },
};
