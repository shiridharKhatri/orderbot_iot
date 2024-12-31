const mongoose = require("mongoose");
const connectToDatabase = (url) => {
  try {
    let connection = mongoose.connect(url);
    return connection;
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDatabase;
