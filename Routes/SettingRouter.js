const express = require("express");
const SettingController = require("../Controllers/SettingController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.route("/").get(SettingController.index);

router.use(AuthController.protect);

router.route("/").post(SettingController.create);

router.route("/pushNotification").post(SettingController.pushNotification);

router
  .route("/:id")
  .get(SettingController.show)
  .put(SettingController.update)
  .delete(SettingController.delete);

module.exports = router;
