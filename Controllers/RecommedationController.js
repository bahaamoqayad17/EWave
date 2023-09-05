const factory = require("./FactoryHandler");
const Recommedation = require("../Models/Recommedation");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
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

  req.body.image = `recommendation-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .toFormat("png")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.image}`);

  next();
});

exports.index = CatchAsync(async (req, res, next) => {
  const data = await Recommedation.find({ is_paid: 0 });
  const count = await Recommedation.countDocuments({ is_paid: 0 });

  res.status(200).json({
    status: "success",
    data,
    count,
  });
});

exports.create = factory.create(Recommedation);
exports.show = factory.show(Recommedation);
exports.update = factory.update(Recommedation);
exports.delete = factory.delete(Recommedation);

exports.paidCategory = CatchAsync(async (req, res, next) => {
  const { category } = req.params;

  if (req.user.role === "Admin") {
    const data = await Recommedation.find({ is_paid: 1 });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  } else {
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

    const data = await Recommedation.find({ is_paid: 1, category });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
    });
  }
});

exports.unPaidCategory = CatchAsync(async (req, res, next) => {
  const { category } = req.params;

  const data = await Recommedation.find({ is_paid: 0, category });

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.paid = CatchAsync(async (req, res, next) => {
  if (req.user.role === "Admin") {
    const data = await Recommedation.find({ is_paid: 1 });
    const count = await Recommedation.countDocuments({ is_paid: 1 });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
      count,
    });
  } else {
    if (req.user.is_paid == 0) {
      return next(new AppError("You Need To Subscribe for this", 400));
    }

    if (req.user.expire_payment < Date.now()) {
      return next(new AppError("Your Subscription has been Expired", 400));
    }

    const data = await Recommedation.find({ is_paid: 1 });
    const count = await Recommedation.countDocuments({ is_paid: 1 });

    if (!data) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data,
      count,
    });
  }
});
