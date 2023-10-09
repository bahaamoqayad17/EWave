const express = require("express");
const MessageController = require("../Controllers/MessageController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.route("/").post(MessageController.create);

router.use(AuthController.protect);

router.route("/").get(MessageController.index);

router
  .route("/:id")
  .get(MessageController.show)
  .put(MessageController.update)
  .delete(MessageController.delete);

module.exports = router;
