const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Give Us Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Give Us Your Email"],
    },
    mobile_number: {
      type: String,
      required: [true, "Please Give Us Your Mobile Number"],
    },
    message: {
      type: String,
      required: [true, "Please Give Us Your Message"],
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", Schema);

module.exports = Message;
