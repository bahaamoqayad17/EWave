const express = require("express");
const VideoController = require("../Controllers/VideoController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.use(AuthController.protect);

router
  .route("/")
  .get(VideoController.index)
  .post(
    VideoController.uploadImage,
    VideoController.resizeImage,
    VideoController.create
  );
router.route("/paid").get(VideoController.paid);
router.route("/free").get(VideoController.free);

router
  .route("/:id")
  .get(VideoController.show)
  .put(
    VideoController.uploadImage,
    VideoController.resizeImage,
    VideoController.update
  )
  .delete(VideoController.delete);

module.exports = router;
