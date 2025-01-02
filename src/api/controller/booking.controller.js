const { getAllBookings, createBulk } = require('../service/booking.service')
const csvtoJson = require('csvtojson');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
module.exports = {
    getAllBookings: async (req,res,next)=>{
        try {
            const booking = await getAllBookings();
            return res.status(200).json({message:'Records Fetched SuccessFully !',data: booking})
        } catch (error) {
            next(error)
        }
    },
    createBulk: async (req,res,next)=>{
        try {
            let data = req.body;
            if(req.file){
                console.log(req.file)
                data = await csvtoJson().fromFile(req.file.path);
            }
            const booking = await createBulk(data);
            console.log(booking.errors)
            if(booking.errors.length > 0){

                const jsonTOCsv = new Parser();
                const csv = jsonTOCsv.parse(booking.errors);
                const fileext = `${req.file.originalname.split('.')[0]}-${Date.now()}.csv`;
                const fileName = path.join(__dirname,`../../../public/csv/Errors-${fileext}`);
                fs.writeFileSync(fileName,csv);
                return res.status(200).json({
                    message:"Partially Created SuccessFully !",
                    data: `/csv/Errors-${fileext}`
                });
                
            }
            return res.status(200).json({message:'Created SuccessFully !',data:booking})
        } catch (error) {
            next(error)
        }
    },
    deleteBulk : async (req,res,next)=>{
        try{

        }
        catch(error){
            next(error)
        }
    }
}