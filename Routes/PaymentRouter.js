const express = require("express");
const PaymentController = require("../Controllers/PaymentController");
const AuthController = require("../Controllers/AuthController");

const router = express.Router();

router.route("/success").get(PaymentController.success);
router.route("/cancel").get(PaymentController.cancel);

router.use(AuthController.protect);

router.route("/").get(PaymentController.index).post(PaymentController.create);
router.route("/pay").post(PaymentController.pay);

router
  .route("/:id")
  .get(PaymentController.show)
  .put(PaymentController.update)
  .delete(PaymentController.delete);

module.exports = router;
