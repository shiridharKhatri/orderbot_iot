const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToDatabase = require("./database/db");
dotenv.config();
const PORT = process.env.PORT || 6000;
connectToDatabase(process.env.DATABASE_URL)



  .then(() => {
    console.log(`Successfully connected to the database `);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
