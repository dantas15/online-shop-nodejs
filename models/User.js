const mongodb = require("mongodb");
const getDB = require("../util/database").getDB;

class User {
  constructor(username, email, cart) {
    this.name = username;
    this.email = email;
    this.cart = cart;
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
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // });
    const updatedCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDB();

    db.collection("users").updateOne(
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
