const express = require("express");
const exphbs = require("express-handlebars");

const connection = require("./config/connection");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  connection.query("SELECT * FROM cars", function (err, data) {
    res.render("cars", { cars: data });
  });
});

app.get("/cars/new", function (req, res) {
  res.render("new-car");
});

app.get("/cars/:VIN", function (req, res) {
  connection.query(
    "SELECT * FROM cars WHERE VIN = ?",
    [req.params.VIN],
    function (err, data) {
      res.render("single-car", data[0]);
    }
  );
});

app.post("/cars", function (req, res) {
  connection.query(
    "INSERT INTO cars (make, model, VIN, mileage, color) VALUES (?, ?, ?, ?, ?)",
    [
      req.body.make,
      req.body.model,
      req.body.VIN,
      req.body.mileage,
      req.body.color,
    ],
    function (err, data) {
      if (err) {
        //   throw new Error(err);
        res.status(500);
        return res.json(err);
      }
      res.json({ success: true });
    }
  );
});

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
