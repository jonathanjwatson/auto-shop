const express = require("express");
const exphbs = require("express-handlebars");

const connection = require("./config/connection");
const orm = require("./config/orm");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/cars", function (req, res) {
  orm.getAllCars(function (err, data) {
    if (err) {
      res.status(500).send("An error occurred.");
    }
    res.render("cars", { cars: data });
  });
});

app.get("/cars/new", function (req, res) {
  res.render("new-car");
});

app.get("/cars/:VIN", function (req, res) {
  orm.getCarByVIN(req.params.VIN, function (err, data) {
    if (err) {
      res.status(500).send("An error occurred.");
    }
    res.render("single-car", data);
  });
});

app.post("/cars", function (req, res) {
  orm.createNewCar(
    req.body.make,
    req.body.model,
    req.body.VIN,
    req.body.mileage,
    req.body.color,
    function (err, data) {
      if (err) {
        res.status(500);
        return res.json({
          error: true,
          success: false,
          message: "An unexpected error occurred while creating your new car.",
        });
      } else {
        res.json({
          success: true,
        });
      }
    }
  );
});

app.listen(PORT, function () {
  console.log(`App listening on http://localhost:${PORT}`);
});
