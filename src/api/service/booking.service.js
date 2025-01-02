const bookingModel = require("../../model/booking.model");
const { transactions } = require("../../utils/transaction");
const { bookingValidate } = require("../../utils/validate");
const { validationError } = require("../../utils/customError");
const { deleteFilter, updateFilter } = require("../../utils/filterOption");
module.exports = {
  getAllBookings: async () => {
    return transactions(async (t) => {
      const bookings = await bookingModel.findAll({
        transactions: t,
        logging: console.log,
      });
      // console.log(bookings);
      return bookings;
    });
  },
  createBulk: async (data) => {
    // console.log("---",data.data)

    // validations
    // const val = data.data.map((item,index)=>{
    //     const { error, value } = bookingValidate.validate(item);
    //     if (error) {
    //         console.log(error.details[0].message)
    //         const msg = error.details[0].message + ' at ' +( index +1 )+' object'
    //         throw new validationError(msg, 422);
    //     }
    //     return value
    // })

    // skip the error then upload the data

    const len = data.length;
    let crt = [];
    let err = [] || 0;
    console.log(len);
    for (let i = 0; i < len; i++) {
      const { error, value } = bookingValidate.validate(data[i]);
      if (error) {
        err.push({
            error:error.details[0].message + " at " + (i + 1) + " object",
            data: data[i],
        });
        continue;    //this continue will skip the error part and upload the data
      }
      crt.push(value);
      console.log(value);
    }


    console.log("crt", crt);


    

    return transactions(async (t) => {
    //   const bookings = await bookingModel.bulkCreate(data.data, {
    //     transactions: t,
    //     logging: console.log,
    //   });

      const bookings = await bookingModel.bulkCreate(crt, {
        transactions: t,
        logging: console.log,
      });
      // console.log(bookings)
      const result = {
        created: bookings.length,
        errors: err,
      }
      return result;    
    });
  },
  deleteBulk : async (data)=>{
    // console.log("data",data)
    const deleteFilters = deleteFilter(data)
    // console.log("df",deleteFilters)
      return transactions(async (t)=>{
        const deleteBookings = await bookingModel.destroy({...deleteFilters,transactions:t,logging:console.log})
        return deleteBookings
      })
  },
  updateBulk : async (data)=>{
    const updateFilters = updateFilter(data);
    console.log("uf",updateFilters,data.update_options)
    return transactions(async (t)=>{
      const booking = await bookingModel.update(data.update_options,{...updateFilters,paranoid:false,transactions:t,logging:console.log}) 
      return booking
    })
  },
};
