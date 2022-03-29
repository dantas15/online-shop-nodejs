const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const errorController = require("./controllers/error");
const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("61fadd2b93431aa9d3224e61")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.getPageNotFound);

const PORT = 3000;

mongoose
  .connect(process.env.DB_MONGO_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Gus",
          email: "gus@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
