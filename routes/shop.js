const router = require("express").Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/products", productsController.getProducts);
router.get("/cart", productsController.getCart);
router.get("/checkout", productsController.getCheckout);
router.get("/product-detail", productsController.getProductDetail);

module.exports = router;
