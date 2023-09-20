const express = require("express");
const CategoryController = require("../Controllers/CategoryController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.route("/").get(CategoryController.index);

router.use(AuthController.protect);

router
  .route("/")
  .post(
    CategoryController.uploadImage,
    CategoryController.resizeImage,
    CategoryController.create
  );

router
  .route("/:id")
  .get(CategoryController.show)
  .put(
    CategoryController.uploadImage,
    CategoryController.resizeImage,
    CategoryController.update
  )
  .delete(CategoryController.delete);

module.exports = router;
