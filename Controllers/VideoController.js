const factory = require("./FactoryHandler");
const Video = require("../Models/Video");
const CatchAsync = require("../utils/CatchAsync");

exports.index = factory.index(Video);
exports.create = factory.create(Video);
exports.show = factory.show(Video);
exports.update = factory.update(Video);
exports.delete = factory.delete(Video);

exports.paid = CatchAsync(async (req, res, next) => {
  const data = await Video.find({ status: "Paid" });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.free = CatchAsync(async (req, res, next) => {
  const data = await Video.find({ status: "Free" });

  res.status(200).json({
    status: "success",
    data,
  });
});
