const factory = require("./FactoryHandler");
const User = require("../Models/User");
const CatchAsync = require("../utils/CatchAsync");
const SendEmail = require("../utils/SendEmail");
const bcrypt = require("bcryptjs");

exports.index = factory.index(User);
exports.create = factory.create(User);
exports.show = factory.show(User);
exports.update = factory.update(User);
exports.delete = factory.delete(User);

const resetTokens = {}; // Initialize the resetTokens object

exports.forgetPassword = CatchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a 4-digit random code
  const code = String(Math.floor(Math.random() * 9999));

  // Save the code with a timestamp (to check expiration later)
  resetTokens[email] = {
    code,
    timestamp: Date.now(),
  };

  // Send the code via email
  await SendEmail(email, "Password Reset Code", `Your code is: ${code}`);

  res.status(200).json({ message: `Code sent successfully` });
});

exports.verifyCode = CatchAsync(async (req, res, next) => {
  const { email, code } = req.body;
  const resetData = resetTokens[email];

  if (!resetData) {
    return res.status(404).json({ message: "Reset data not found" });
  }

  const { code: storedCode, timestamp } = resetData;

  console.log({ code });
  console.log({ email });
  console.log({ storedCode });

  // Check if the code is correct and not expired (90 seconds expiration)
  if (code !== storedCode || Date.now() - timestamp > 90000) {
    return res.status(400).json({ message: "Invalid code or expired" });
  }

  res.status(200).json({ message: "Code verified successfully" });
});

exports.resetPassword = CatchAsync(async (req, res, next) => {
  const { email, newPassword } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    {
      password: await bcrypt.hash(newPassword, 12),
    }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update the user's password (replace with your database update logic)
  user.password = newPassword;

  // Remove the reset token
  delete resetTokens[email];

  res.status(200).json({ message: "Password reset successful" });
});
