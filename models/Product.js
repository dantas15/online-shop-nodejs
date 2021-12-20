const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

class Product {
  constructor({ title, price, description, imageURL, id }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageURL = imageURL;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDB();

    let dbOp;

    if (this._id) {
      //Update
      const query = { _id: mongodb.ObjectId(this._id) };
      dbOp = db.collection("products").updateOne(query, { $set: this });
    } else {
      // Create new product
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
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

    const query = { _id: mongodb.ObjectId(id) };

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

  static delete(deleteProdId) {
    const db = getDB();

    const query = { _id: mongodb.ObjectId(deleteProdId) };

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
