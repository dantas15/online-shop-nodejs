const Product = require("../models/Product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/products-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
      hasProducts: products.length > 0,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      pageTitle: product.title,
      path: "/products",
      product: product,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your orders",
    path: "/orders",
  });
};

exports.getProductDetail = (req, res, next) => {
  res.render("shop/product-detail", {
    pageTitle: "Product Detail",
    path: "/product-detail",
  });
};
