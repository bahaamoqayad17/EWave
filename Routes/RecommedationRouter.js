const express = require("express");
const RecommedationController = require("../Controllers/RecommedationController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.use(AuthController.protect);

router
  .route("/")
  .get(RecommedationController.index)
  .post(
    RecommedationController.uploadImage,
    RecommedationController.resizeImage,
    RecommedationController.create
  );

router.route("/paid").get(RecommedationController.paid);

router.route("/paid/:category").get(RecommedationController.paidCategory);
router.route("/unpaid").get(RecommedationController.unPaidCategory);
router.route("/deleteAll").post(RecommedationController.deleteAll);

router
  .route("/:id")
  .get(RecommedationController.show)
  .put(
    RecommedationController.uploadImage,
    RecommedationController.resizeImage,
    RecommedationController.update
  )
  .delete(RecommedationController.delete);

module.exports = router;
