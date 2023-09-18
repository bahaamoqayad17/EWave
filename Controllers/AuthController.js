const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const uuid = require("uuid");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.register = CatchAsync(async (req, res, next) => {
  const mobileNumber = uuid.v4();
  const user = await User.create({
    // name: req.body.name,
    email: req.body.email,
    mobile_number: mobileNumber,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(user, 201, req, res);
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password, fcm_token } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOneAndUpdate(
    { email },
    {
      fcm_token,
    }
  ).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});
0;
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = CatchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.refresh = CatchAsync(async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ auth: false, message: "No token provided" });
  }
  jwtverify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token" });
    }

    // check expiration
    if (decoded.exp < Date.now() / 1000) {
      // renew token
      const renewToken = jwt.sign(
        {
          data: decoded.data,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "Stack",
        }
      );

      // update token
      req.headers["x-access-token"] = renewToken;

      // send new token
      res.status(200).json({ auth: true, token: renewToken });
    } else {
      // send existing token
      res.status(200).json({ auth: true, token: token });
    }
  });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
