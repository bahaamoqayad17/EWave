const factory = require("./FactoryHandler");
const Payment = require("../Models/Payment");
const CatchAsync = require("../utils/CatchAsync");
const paypal = require("paypal-rest-sdk");

exports.index = factory.index(Payment);
exports.create = factory.create(Payment);
exports.show = factory.show(Payment);
exports.update = factory.update(Payment);
exports.delete = factory.delete(Payment);

exports.pay = CatchAsync(async (req, res, next) => {
  paypal.configure({
    mode: "sandbox",
    client_id:
      "AcHKVxMOhJS6ZBoYdupt9YAOS-2U8bTNvsvNxDLKRU6YKy0nKIunDiqe43hmKSAZ-ShAKSTgCqjKlzKZ",
    client_secret:
      "EJkZ1C8iZ058OzLo1pw9yJtRRvAr4bi1Tl4BWQpotXCcYI6HoGPEUmYgAcatdqPygRmyXsgmqLDY8K5m",
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
      console.error(error);
      res.send("Something went wrong");
    } else {
      // Update the payment status in your database
      Payment.findOneAndUpdate(
        { transaction_id: payment.id },
        { status: payment.state },
        (updateError, updatedPayment) => {
          if (updateError) {
            console.error(updateError);
            res.send("Something went wrong");
          } else {
            res.send("Payment Completed successfully");
          }
        }
      );
    }
  });
});

exports.cancel = CatchAsync(async (req, res, next) => {
  res.send("Payment cancelled");
});
