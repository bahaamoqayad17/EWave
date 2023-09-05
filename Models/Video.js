const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "url is required"],
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", Schema);

module.exports = Video;
