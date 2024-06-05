const mongoose = require("mongoose");
const { Schema } = mongoose;

//? Schema

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1 },
  last_name: { type: String, required: true, minLength: 1 },
  email: { type: String, required: true, minLength: 1 },
  password: { type: String, required: true, minLength: 1 },
  membership_status: String,
  isAdmin: String,
});

// //! Fullname virtual Property

UserSchema.virtual("fullname").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

module.exports = mongoose.model("User", UserSchema);
