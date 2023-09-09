const factory = require("./FactoryHandler");
const Recommedation = require("../Models/Recommedation");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");
const ApiFeatures = require("../utils/ApiFeatures");

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
  const features = new ApiFeatures(
    Recommedation.find({ is_paid: { $in: [0, 2] } }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;
  const count = await Recommedation.countDocuments({
    is_paid: { $in: [0, 2] },
  });

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
    const features = new ApiFeatures(
      Recommedation.find({
        is_paid: { $in: [1, 2] },
        category,
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;

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

    const features = new ApiFeatures(
      Recommedation.find({
        is_paid: { $in: [1, 2] },
        category,
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;

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
  const features = new ApiFeatures(
    Recommedation.find({
      is_paid: { $in: [0, 2] },
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const data = await features.query;

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
    const features = new ApiFeatures(
      Recommedation.find({
        is_paid: { $in: [1, 2] },
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;
    const count = await Recommedation.countDocuments({
      is_paid: { $in: [1, 2] },
    });

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

    const features = new ApiFeatures(
      Recommedation.find({
        is_paid: { $in: [1, 2] },
      }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const data = await features.query;

    const count = await Recommedation.countDocuments({
      is_paid: { $in: [1, 2] },
    });

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

exports.deleteAll = CatchAsync(async (req, res, next) => {
  const data = await Recommedation.deleteMany({
    _id: { $in: req.body },
  });

  if (!data) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});
