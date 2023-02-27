const multer = require('multer');
const path = require('path');

const storeImageProduct = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../../public/images/products'));
    },
    filename : function (req, file, callback) {
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const uploadImageProduct = multer({ storage: storeImageProduct });

module.exports = {
    uploadImageProduct,
}