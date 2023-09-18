const factory = require("./FactoryHandler");
const Payment = require("../Models/Payment");
const User = require("../Models/User");
const CatchAsync = require("../utils/CatchAsync");
const paypal = require("paypal-rest-sdk");

exports.index = factory.index(Payment);
exports.create = factory.create(Payment);
exports.show = factory.show(Payment);
exports.update = factory.update(Payment);
exports.delete = factory.delete(Payment);

exports.pay = CatchAsync(async (req, res, next) => {
  Payment.create({
    user: req.user._id,
    amount: 120,
  });
  res.json({
    link: `${process.env.BASE_URL}api/v1/payments/paymentPage?id=${req.user._id}`,
  });
});

exports.paymentPage = CatchAsync(async (req, res, next) => {
  res.sendFile("/Payment.html", { root: __dirname });
});

exports.success = CatchAsync(async (req, res, next) => {
  Payment.findOneAndUpdate(
    { user: req.params.id },
    { status: req.body.status, transaction_id: req.body.id },
    (updateError, updatedPayment) => {
      if (updateError) {
        console.log(updateError);
        res.send("<h1>Something went wrong</h1>");
      } else {
        console.log(updatedPayment);
        User.findByIdAndUpdate(
          { _id: updatedPayment.user._id },
          {
            is_paid: 1,
            expire_payment: Date.now() + 30 * 24 * 60 * 60 * 1000,
          },
          (updateError, updatedUser) => {
            if (updateError) {
              console.log(updateError);
              res.send("Something went wrong");
            }
            res.sendFile("/Success.html", { root: __dirname });
          }
        );
      }
    }
  );
});

exports.cancel = CatchAsync(async (req, res, next) => {
  res.send("<h1>Payment Cancelled</h1>");
});
