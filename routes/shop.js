const path = require("path");

const router = require("express").Router();

const productsController = require("../controllers/products");

router.get("/", productsController.getIndexPage);
router.get("/products", productsController.getProducts);
router.get("/cart", productsController.getCart);
router.get("/checkout", productsController.getCheckout);
router.get("/product-detail", productsController.getProductDetail);

module.exports = router;
