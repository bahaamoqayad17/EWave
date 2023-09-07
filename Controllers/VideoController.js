const factory = require("./FactoryHandler");
const Video = require("../Models/Video");
const CatchAsync = require("../utils/CatchAsync");

exports.index = factory.index(Video);
exports.create = factory.create(Video);
exports.show = factory.show(Video);
exports.update = factory.update(Video);
exports.delete = factory.delete(Video);

exports.paid = CatchAsync(async (req, res, next) => {
  if (req.user.role === "Admin") {
    const data = await Video.find({ status: { $in: ["Paid", "All"] } });

    res.status(200).json({
      status: "success",
      data,
    });
  }

  if (req.user.is_paid == 0) {
    return res
      .status(400)
      .json({ meesage: "You Need To Subscribe For Thie Recommendations" });
  }

  if (req.user.expire_payment < Date.now()) {
    return res
      .status(400)
      .json({ meesage: "Your Subscription has been Expired" });
  }

  const data = await Video.find({ status: { $in: ["Paid", "All"] } });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.free = CatchAsync(async (req, res, next) => {
  const data = await Video.find({ status: { $in: ["Free", "All"] } });

  res.status(200).json({
    status: "success",
    data,
  });
});
