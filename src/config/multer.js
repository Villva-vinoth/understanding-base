const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        console.log(file.mimetype,"file")
        if(file.mimetype === "text/csv"){
            cb(null, 'public/csv');
        }
        else if(file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.oasis.opendocument.spreadsheet"){
            cb(null, 'public/excel');
        }
        else{
            cb(null, 'public');
        }
    }
})

const upload = multer({ storage: storage });

module.exports = {upload}