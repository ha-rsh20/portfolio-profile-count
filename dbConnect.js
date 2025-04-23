const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/portfolio")
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((err) => {
      console.log("Unable to connect to database: ", err);
    });
};

module.exports = { connect };
