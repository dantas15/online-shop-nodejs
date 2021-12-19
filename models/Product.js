const getDB = require("../util/database").getDB;
const { ObjectId } = require("mongodb");

class Product {
  constructor({ title, price, description, imageURL }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
  }

  save() {
    const db = getDB();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDB();

    const query = { _id: ObjectId(id) };

    return db
      .collection("products")
      .findOne(query, {
        projection: { _id: 0, title: 1, price: 1, description: 1, imageURL: 1 },
      })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
