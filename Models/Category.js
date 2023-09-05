const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      transform: function (image) {
        return `${process.env.BASE_URL}${image}`;
      },
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", Schema);

module.exports = Category;
