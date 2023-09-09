const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "Link is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      // required: [true, "description is required"],
    },
    status: {
      type: String,
      enum: ["Paid", "Free", "All"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      transform: function (image) {
        return `${process.env.BASE_URL}${image}`;
      },
    },
    pinned: {
      type: Number,
      default: 0, // 0: "Not Pinned", 1: "Pinned",
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", Schema);

module.exports = Video;
