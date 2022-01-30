const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDB();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  addToCart(product) {
    const updatedCart = {
      items: [{ productId: mongodb.ObjectId(product._id), quantity: 1 }],
    };
    const db = getDB();

    return db
      .collection("users")
      .updateOne(
        { _id: mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDB();

    return db
      .collection("users")
      .findOne({ _id: mongodb.ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
