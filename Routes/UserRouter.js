const express = require("express");
const AuthController = require("../Controllers/AuthController");
const UserController = require("../Controllers/UserController");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

router.route("/forgotPassword").post(UserController.forgetPassword);
router.route("/verifyCode").post(UserController.verifyCode);
router.route("/resetPassword").post(UserController.resetPassword);

router.use(AuthController.protect);

router.route("/").get(UserController.index).post(UserController.create);

router
  .route("/:id")
  .get(UserController.show)
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;
