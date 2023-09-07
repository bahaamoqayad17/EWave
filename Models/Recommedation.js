const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    action: {
      type: String,
      required: [true, "Action is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      transform: function (image) {
        return `${process.env.BASE_URL}${image}`;
      },
    },
    status: {
      type: Number, // 0: pending, 1: active, 2: expired
      required: [true, "Status is required"],
    },
    opening_time: {
      type: Date,
      required: [true, "Opening time is required"],
    },
    trade_style: {
      type: Number, // 0: Swing Trade, 1: Interday
      required: [true, "Trade Style is required"],
    },
    risk_per_trade: {
      type: Number,
      required: [true, "Risk per trade is required"],
    },
    first_target_price: {
      type: Number,
      required: [true, "First Target price is required"],
    },
    second_target_price: {
      type: Number,
      required: [true, "Second Target price is required"],
    },
    open_price: {
      type: Number,
      required: [true, "Opem Price is required"],
    },
    stop_loss: {
      type: Number,
      required: [true, "Stop loss is required"],
    },
    trade_result: {
      type: Number, // 0: waiting, 1: Break even , 2: Target 1, 3: Target 2, 4: Stop loss
      required: [true, "Trade Result is required"],
    },
    expire_time: {
      type: String,
      required: [true, "Expire time is required"],
    },
    win_rate: {
      type: Number,
      required: [true, "Win rate is required"],
    },
    last_update: {
      type: Date,
      required: [true, "Last update is required"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
    is_paid: {
      type: Number, // 0: free, 1: paid, 2:all
      required: [true, "Is paid is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);

const Recommedation = mongoose.model("Recommedation", Schema);

module.exports = Recommedation;
