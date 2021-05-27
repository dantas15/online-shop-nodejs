const path = require("path");

const router = require("express").Router();

const productsController = require("../controllers/products");

router.get("/add-product", productsController.getAddProduct);
router.get("/edit-product", productsController.getEditProduct);
router.get("/products-list", productsController.getAdminProducts);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;
