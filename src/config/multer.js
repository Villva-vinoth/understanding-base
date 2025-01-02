const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, file.originalname);
    },
    destination: (req, file, cb) => {
        cb(null, 'public/csv');
    }
})

const upload = multer({ storage: storage });

module.exports = upload