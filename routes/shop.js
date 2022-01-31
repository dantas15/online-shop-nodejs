const router = require("express").Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/product/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

// router.post("/create-order", shopController.postOrder);

// router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

// router.get("/product-detail", shopController.getProductDetail);

// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
