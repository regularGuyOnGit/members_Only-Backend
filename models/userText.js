const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const MsgSchema = new Schema({
  title: { type: String, required: true, minLength: 1 },
  time_stamp: Date,
  msg_text: { type: String, required: true, minLength: 1 },
  user_created_it: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    minLength: 1,
  },
});

MsgSchema.virtual("deletePost").get(function () {
  return `/message/${this._id}/delete`;
});
MsgSchema.virtual("timeFormatted").get(function () {
  return DateTime.fromJSDate(this.time_stamp).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Messages", MsgSchema);
