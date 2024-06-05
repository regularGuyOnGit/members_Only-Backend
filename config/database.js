const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mainConnect().catch((e) => e);
async function mainConnect() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log(error);
  }
}

module.exports = mongoose;
