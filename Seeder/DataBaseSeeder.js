const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../Models/User");
const Recommedation = require("../Models/Recommedation");
const Article = require("../Models/Article");
const Setting = require("../Models/Setting");
const Payment = require("../Models/Payment");

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

const recommedations = JSON.parse(
  fs.readFileSync(__dirname + "/recommedations.json", "utf-8")
);
const articles = JSON.parse(
  fs.readFileSync(__dirname + "/articles.json", "utf-8")
);
const settings = JSON.parse(
  fs.readFileSync(__dirname + "/settings.json", "utf-8")
);
const payments = JSON.parse(
  fs.readFileSync(__dirname + "/payments.json", "utf-8")
);
const users = JSON.parse(fs.readFileSync(__dirname + "/users.json", "utf-8"));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Recommedation.create(recommedations);
    await Article.create(articles);
    await Setting.create(settings);
    await Payment.create(payments);
    await User.create(users, { validateBeforeSave: false });
    console.log("Data Successfully Inserted !");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Recommedation.deleteMany();
    await Article.deleteMany();
    await Setting.deleteMany();
    await Payment.deleteMany();
    await User.deleteMany();
    console.log("Data Successfully Deleted !");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--seed") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
