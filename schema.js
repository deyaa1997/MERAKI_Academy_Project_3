const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String ,required: true },
  lastName: { type: String ,required: true},
  age: { type: Number ,required: true},
  country: { type: String ,required: true},
  email : {type: String , required : true , unique:true},
  password: { type: String ,required: true},
});

const articlesSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  comments: [{type: mongoose.Schema.ObjectId, ref: "Comment" }]
});

const commentsSchema = new mongoose.Schema({
  comment: { type: String ,required: true },
  commenter: { type: mongoose.Schema.ObjectId, ref: "User",required: true}
});




module.exports.Users = mongoose.model("User", usersSchema);
module.exports.Articles = mongoose.model("Article", articlesSchema);
module.exports.Comments = mongoose.model("Comment", commentsSchema);
