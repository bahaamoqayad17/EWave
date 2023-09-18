const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transaction_id: {
      type: String,
    },
    amount: {
      type: Number,
    },
    currency: {
      type: String,
      default: "USD",
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

Schema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
  });
  next();
});

const Payment = mongoose.model("Payment", Schema);

module.exports = Payment;
