const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    title: { type: String, required: [true, "Article Must Have an Title"] },
    content: { type: String, required: [true, "Article Must Have an Content"] },
    image: {
      type: String,
      required: [true, "Article Must Have an Image"],
      transform: function (image) {
        return `${process.env.BASE_URL}${image}`;
      },
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", Schema);

module.exports = Article;
