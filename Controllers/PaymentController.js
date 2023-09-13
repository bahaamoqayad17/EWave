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
  paypal.configure({
    mode: "live",
    client_id:
      "Ab-vgWU9UeL4XgslWaIYnRpYhhxANHTa2oLBMyfNwvadX_3nntAheH-ju4H9m1rsbbaIoXmtJykQwS0z",
    client_secret:
      "EBm3j-N9BdL9OI4YYdXui7j3Q2t1T-EJ9-9nkfnldG2oCWE-Yw3lwL1RcGg8-B1n7UBJ2PxIISH6sJ9z",
  });

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: 120,
          currency: "USD",
        },
      },
    ],
    redirect_urls: {
      return_url: `${process.env.BASE_URL}api/v1/payments/success`,
      cancel_url: `${process.env.BASE_URL}api/v1/payments/cancel`,
    },
  };
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      Payment.create({
        user: req.user._id,
        transaction_id: payment.id,
        amount: 120,
        currency: "USD",
        status: payment.state,
      });
      for (const link of payment.links) {
        if (link.method === "REDIRECT") {
          return res.json({ link: link.href });
        }
      }
    }
  });
});

exports.success = CatchAsync(async (req, res, next) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;

  const executePayment = {
    payer_id: payerId,
  };

  paypal.payment.execute(paymentId, executePayment, (error, payment) => {
    if (error) {
      console.log(error);
      res.send("Something went wrong test");
    } else {
      // Update the payment status in your database
      Payment.findOneAndUpdate(
        { transaction_id: payment.id },
        { status: payment.state },
        (updateError, updatedPayment) => {
          if (updateError) {
            console.log(updateError);
            res.send("Something went wrong easd");
          } else {
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
                res.send("Payment Completed successfully");
              }
            );
          }
        }
      );
    }
  });
});

exports.cancel = CatchAsync(async (req, res, next) => {
  res.send("Payment cancelled");
});
