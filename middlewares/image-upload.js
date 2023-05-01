const multer = require('multer')


const baseUploadDest = __dirname
const destSuffix = '/../uploads/images'
const UploadDest = baseUploadDest + destSuffix


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UploadDest)
    },
    filename: function (req, file, cb) {
        len = file.originalname.length
        cb(null, file.originalname)
    }
})


const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml')
        cb(null, true);
    else
        cb(new Error('Only JPEG and PNG image formats allowed'), false);
}


const imageUpload = multer({ storage: storage, fileFilter: fileFilter })


module.exports = imageUpload