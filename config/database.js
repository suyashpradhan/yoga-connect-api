const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB Connected!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = databaseConnection;
