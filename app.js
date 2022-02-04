const path = require("path");

const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();

const errorController = require("./controllers/error");
const User = require("./models/User");

const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use(errorController.getPageNotFound);

const PORT = 3000;

mongoose
  .connect(process.env.DB_MONGO_URI)
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
