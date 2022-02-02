const Product = require("../models/Product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageURL = req.body.imageURL;

  const product = new Product({
    title,
    price,
    description,
    imageURL,
    // userId: req.user._id,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      console.log("Created product");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  Product.findById(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, price, imageURL, description } = req.body;

  return Product.findById(productId).then((product) => {
    product.title = title;
    product.price = price;
    product.imageURL = imageURL;

    product
      .save()
      .then((result) => {
        console.log("Updated product!");
        res.redirect("/admin/products");
      })
      .catch((err) => console.log(err));
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/products-list", {
        prods: products,
        pageTitle: "Products",
        path: "/admin/products",
        hasProducts: products.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByIdAndRemove(prodId)
    .then((result) => {
      console.log("Destroyed product!");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};
