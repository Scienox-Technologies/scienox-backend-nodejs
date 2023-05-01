const multer = require('multer')


const baseUploadDest = __dirname
const destSuffix = '/../uploads/lectureFiles'
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


const documentUpload = multer({ storage: storage })


module.exports = documentUpload