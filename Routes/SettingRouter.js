const express = require("express");
const SettingController = require("../Controllers/SettingController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.use(AuthController.protect);

router.route("/").get(SettingController.index).post(SettingController.create);

router.route("/pushNotification").post(SettingController.pushNotification);

router
  .route("/:id")
  .get(SettingController.show)
  .put(SettingController.update)
  .delete(SettingController.delete);

module.exports = router;
