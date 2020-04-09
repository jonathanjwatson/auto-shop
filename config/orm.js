const connection = require("./connection");

const orm = {
  getAllCars: function (cb) {
    connection.query("SELECT * FROM cars", function (err, data) {
      console.log(data);
      if (err) console.log(err);
      cb(err, data);
    });
  },
  getCarByVIN: function (VIN, cb) {
    connection.query("SELECT * FROM cars WHERE VIN = ?", [VIN], function (
      err,
      data
    ) {
      if (err) console.log(err);
      cb(err, data[0]);
    });
  },
  createNewCar: function (make, model, VIN, mileage, color, cb) {
    connection.query(
      "INSERT INTO cars (make, model, VIN, mileage, color) VALUES (?, ?, ?, ?, ?)",
      [make, model, VIN, mileage, color],
      function (err, data) {
        if (err) console.log(err);
        cb(err, data);
      }
    );
  },
};

module.exports = orm;
