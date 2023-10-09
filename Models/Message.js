const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile_number: String,
    messages: String,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", Schema);

module.exports = Message;