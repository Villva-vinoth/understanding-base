const {
  getAllBookings,
  createBulk,
  deleteBulk,
  updateBulk,
} = require("../service/booking.service");
const csvtoJson = require("csvtojson");
const { Parser } = require("json2csv");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
module.exports = {
  getAllBookings: async (req, res, next) => {
    try {
      const booking = await getAllBookings();
      return res
        .status(200)
        .json({ message: "Records Fetched SuccessFully !", data: booking });
    } catch (error) {
      next(error);
    }
  },
  createBulk: async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        console.log(req.file);
        if (req.file.mimetype === "text/csv") {
          data = await csvtoJson().fromFile(req.file.path);
        }
        const excFile = req.file.path;
        const workbook = xlsx.readFile(excFile);
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        data = xlsx.utils.sheet_to_json(workSheet);
      }
      const booking = await createBulk(data);
      console.log(booking.errors);
      if (booking.errors.length > 0) {
        const jsonTOCsv = new Parser();
        let fileext = "";
        let fileName = "";
        let out = "";
        if (req.file.mimetype === "text/csv") {
          const csv = jsonTOCsv.parse(booking.errors);
          fileext = `${req.file.originalname.split(".")[0]}-${Date.now()}.csv`;
          fileName = path.join(
            __dirname,
            `../../../public/csv/Errors-${fileext}`
          );
          fs.writeFileSync(fileName, csv);
          out = `/csv/Errors-${fileext}`;
        } else {
          fileext = `${req.file.originalname.split(".")[0]}-${Date.now()}.xlsx`;
          fileName = path.join(
            __dirname,
            `../../../public/excel/Errors-${fileext}`
          );

          const flatedJson = booking.errors.map((item,ind) => {
            return {
             sno: ind + 1,
             error : item.error,
             Name : item.data.name,
             phone : item.data.phone_number,
            };  
          })

          const worksheet = xlsx.utils.json_to_sheet(flatedJson);
          const workbook = xlsx.utils.book_new();
          xlsx.utils.book_append_sheet(workbook, worksheet, "Errors");
          xlsx.writeFile(workbook, fileName);
          out = `/excel/Errors-${fileext}`;
        }

        return res.status(200).json({
          message: "Partially Created SuccessFully !",
          file: out,
          created: booking.created,
        });
      }
      return res
        .status(200)
        .json({ message: "Created SuccessFully !", data: booking });
    } catch (error) {
      next(error);
    }
  },
  deleteBulk: async (req, res, next) => {
    try {
      const data = req.body;
      const deleteBooking = await deleteBulk(data);
      return res
        .status(200)
        .json({ message: "Deleted Successfully !", data: deleteBooking });
    } catch (error) {
      next(error);
    }
  },
  updateBulk: async (req, res, next) => {
    try {
      const data = req.body;
      const updateBooking = await updateBulk(data);
      return res
        .status(200)
        .json({ message: "Updated Successfully !", data: updateBooking });
    } catch (error) {
      next(error);
    }
  },
};
