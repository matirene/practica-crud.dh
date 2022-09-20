const express = require("express");
const router = express.Router()
const path = require('path');
const multer = require('multer');

const productController = require("../controllers/productController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/img/imagenes-platos'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage })
  

router.get("/list", productController.list);
router.get("/detail/:id", productController.detail);
router.get("/create", productController.create);
router.post("/create", upload.single('image'), productController.store);
router.get("/edit/:id", productController.edit);
router.put("/edit/:id", productController.update);
router.delete("/delete/:id", productController.destroy);

module.exports = router