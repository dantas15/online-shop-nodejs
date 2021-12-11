const path = require("path");

const express = require("express");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");

const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(errorController.getPageNotFound);

const PORT = 3000;

mongoConnect((client) => {
  console.log(client);
  app.listen(PORT);
});
