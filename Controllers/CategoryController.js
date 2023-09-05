const factory = require("./FactoryHandler");
const Category = require("../Models/Category");
const multer = require("multer");
const sharp = require("sharp");
const CatchAsync = require("../utils/CatchAsync");

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

  req.body.image = `category-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .toFormat("png")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.image}`);

  next();
});

exports.index = factory.index(Category);
exports.create = factory.create(Category);
exports.show = factory.show(Category);
exports.update = factory.update(Category);
exports.delete = factory.delete(Category);
