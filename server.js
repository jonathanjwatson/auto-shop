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
    VIN: "asdkhjafs9876q2439058",
  },
  {
    mileage: 100,
    color: "Red",
    make: "Tesla",
    model: "X",
    VIN: "asdkhjafs9876q2439055",
  },
  {
    mileage: 1000,
    color: "White",
    make: "Tesla",
    model: "3",
    VIN: "asdkhjafs9876q2439056",
  },
  {
    mileage: 1,
    color: "Black",
    make: "Tesla",
    model: "3",
    VIN: "asdkhjafs9876q2439057",
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

app.get("/cars/:VIN", function (req, res) {
  console.log(req.params.VIN);
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].VIN === req.params.VIN) {
      res.render("single-car", cars[i]);
    }
  }
});

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
