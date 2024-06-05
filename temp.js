const User = require("./models/userInformation");
const Msg = require("./models/userText");
const mongoose = require("mongoose");
require("dotenv").config();

const options = { useNewUrlParser: true, useUnifiedTopology: true };

async function connDB() {
  try {
    mongoose.connect(process.env.CONNECTION_STRING, options);
  } catch (e) {
    console.log(e);
  }
}
connDB().catch((e) => e);
someFunction();

async function someFunction() {
  const msg1 = new Msg({
    title: "American pie",
    time_stamp: new Date(),
    msg_text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, veniam!",
  });

  await msg1.save();

  console.log("Saved to DB");
}
