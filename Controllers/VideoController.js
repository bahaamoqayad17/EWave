const factory = require("./FactoryHandler");
const Video = require("../Models/Video");
const CatchAsync = require("../utils/CatchAsync");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single("image");

exports.resizeImage = CatchAsync(async (req, res, next) => {
  if (!req.file) {
    delete req.body.image;
    return next();
  }

  req.body.image = `video-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .toFormat("png")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.image}`);

  next();
});

exports.index = factory.index(Video);
exports.create = factory.create(Video);
exports.show = factory.show(Video);
exports.update = factory.update(Video);
exports.delete = factory.delete(Video);

exports.paid = CatchAsync(async (req, res, next) => {
  if (req.user.role === "Admin") {
    const data = await Video.find({ status: { $in: ["Paid", "All"] } }).sort({
      pinned: -1,
    });

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

  const data = await Video.find({ status: { $in: ["Paid", "All"] } }).sort({
    pinned: -1,
  });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.free = CatchAsync(async (req, res, next) => {
  const data = await Video.find({ status: { $in: ["Free", "All"] } }).sort({
    pinned: -1,
  });

  res.status(200).json({
    status: "success",
    data,
  });
});
