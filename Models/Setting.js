const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    privacy: {
      type: String,
      required: [true, "Privacy is required"],
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", Schema);

module.exports = Setting;
