const getDB = require("../util/database").getDB;
const ObjectId = require("mongodb").ObjectId;

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
        projection: { _id: 1, title: 1, price: 1, description: 1, imageURL: 1 },
      })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static update({
    prodId,
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedImageURL,
  }) {
    const db = getDB();

    const filter = { _id: ObjectId(prodId) };

    const updatedProduct = {
      $set: {
        title: updatedTitle,
        price: updatedPrice,
        description: updatedDescription,
        imageURL: updatedImageURL,
      },
    };

    return db
      .collection("products")
      .updateOne(filter, updatedProduct)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static delete(deleteProdId) {
    const db = getDB();

    const query = { _id: ObjectId(deleteProdId) };

    return db
      .collection("products")
      .deleteOne(query)
      .then((result) => {
        console.log(result);
        if (result.deletedCount === 1) {
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
