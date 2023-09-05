const factory = require("./FactoryHandler");
const Article = require("../Models/Article");
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

  req.body.image = `article-${Date.now()}.png`;

  await sharp(req.file.buffer)
    .toFormat("png")
    .jpeg({ quality: 90 })
    .toFile(`public/${req.body.image}`);

  next();
});

exports.index = factory.index(Article);
exports.create = factory.create(Article);
exports.show = factory.show(Article);
exports.update = factory.update(Article);
exports.delete = factory.delete(Article);
