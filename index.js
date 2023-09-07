const express = require("express");
const app = express();
const morgan = require("morgan");
const GlobalErrorHandler = require("./Controllers/ErrorHandler");
const cors = require("cors");
const AppError = require("./utils/AppError");
const path = require("path");
const RecommedationRouter = require("./Routes/RecommedationRouter");
const ArticleRouter = require("./Routes/ArticleRouter");
const SettingRouter = require("./Routes/SettingRouter");
const PaymentRouter = require("./Routes/PaymentRouter");
const UserRouter = require("./Routes/UserRouter");
const VideoRouter = require("./Routes/VideoRouter");
const CategoryRouter = require("./Routes/CategoryRouter");
const admin = require("firebase-admin");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PATCH,PUT,POST,DELETE",
  })
);

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use(morgan("combined"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/recommendations", RecommedationRouter);
app.use("/api/v1/articles", ArticleRouter);
app.use("/api/v1/settings", SettingRouter);
app.use("/api/v1/payments", PaymentRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/videos", VideoRouter);
app.use("/api/v1/categories", CategoryRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Can't find " + req.originalUrl + " on this server", 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
