const express = require("express");
const ArticleController = require("../Controllers/ArticleController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.route("/").get(ArticleController.index);

router.use(AuthController.protect);

router
  .route("/")
  .post(
    ArticleController.uploadImage,
    ArticleController.resizeImage,
    ArticleController.create
  );

router
  .route("/:id")
  .get(ArticleController.show)
  .put(
    ArticleController.uploadImage,
    ArticleController.resizeImage,
    ArticleController.update
  )
  .delete(ArticleController.delete);

module.exports = router;
