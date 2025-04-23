const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb+srv://root:root@cluster0.poouu8j.mongodb.net/")
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((err) => {
      console.log("Unable to connect to database: ", err);
    });
};

module.exports = { connect };
