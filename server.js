const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 8080;

const cars = [
  {
    mileage: 100000,
    color: "Blue",
    make: "Tesla",
    model: "Y",
  },
  {
    mileage: 100,
    color: "Red",
    make: "Tesla",
    model: "X",
  },
  {
    mileage: 1000,
    color: "White",
    make: "Tesla",
    model: "3",
  },
  {
    mileage: 1,
    color: "Black",
    make: "Tesla",
    model: "3",
  },
];

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/cars", function (req, res) {
  res.render("cars", { cars: cars });
});

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
