const router = require("express").Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/product/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCard);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

router.get("/product-detail", shopController.getProductDetail);

module.exports = router;
