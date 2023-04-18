const multer  = require('multer')

const baseUploadDest = __dirname + '/../public'

const documentUpload = multer({ dest: __dirname })

module.exports = documentUpload.single("ava")

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, baseUploadDest + "/uploads")
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const getUniqueSuffix = () => {
//     const dateIn = new Date()
//     var YYYY = dateIn.getFullYear();
//     var MM = dateIn.getMonth() + 1; // getMonth() is zero-based
//     var DD = dateIn.getDate();
//     var hh = dateIn.getHours()
//     var mm = dateIn.getMinutes()
//     var ss = dateIn.getSeconds()

//     const uniqueSuffix = String((10000000000 * YYYY) + (100000000 * MM) + (1000000 * DD) + (10000 * hh) + (100 * mm) + (ss))

//     return uniqueSuffix
// }

// const documentUpload = multer({ dest: baseUploadDest }).single('avatar')
// const documentUpload = multer({ dest: baseUploadDest }).single("document")
// const documentUpload = multer({ storage: storage }).single("document")




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, baseUploadDest + "/uploads")
//     },
//     filename: function (req, file, cb) {

//         // console.log(req.file, req.body)
//         len = file.originalname.length

//         cb(null, file.originalname.slice(0, len - 4) + '-' + getUniqueSuffix() + '.pdf')
//     }
// })



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, baseUploadDest)
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const documentUpload = multer({ storage: storage }).single("document")

module.exports = documentUpload

/*




*/

/*
// const storage = memoryStorage();

const fileFilter = (_req, file, cb) => {
    // if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml') {
        cb(null, true);
    // } else {
    //     cb(new Error('Please choose a valid image file.'), false);
    // }
};

// module.exports = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: fileFilter }).single('document');
*/