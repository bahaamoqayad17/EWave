const factory = require("./FactoryHandler");
const Setting = require("../Models/Setting");
const CatchAsync = require("../utils/CatchAsync");
const admin = require("firebase-admin");
const User = require("../Models/User");

exports.index = factory.index(Setting);
exports.create = factory.create(Setting);
exports.show = factory.show(Setting);
exports.update = factory.update(Setting);
exports.delete = factory.delete(Setting);

exports.pushNotification = CatchAsync(async (req, res, next) => {
  const tokens = await User.find().select("fcm_token");

  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body,
    },
    tokens: tokens.map((token) => token.fcm_token),
  };
  // const response = await admin.messaging().sendToDevice(tokens, message);
  const response = await admin.messaging().sendMulticast(message);

  res.status(200).json({
    status: "success",
    data: response,
  });
});
