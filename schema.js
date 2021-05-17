const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  password: { type: String },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
});

module.exports.Users = mongoose.model("User", usersSchema);
module.exports.Articles = mongoose.model("Article", articlesSchema);
