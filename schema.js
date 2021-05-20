const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const usersSchema = new mongoose.Schema({
  firstName: { type: String ,required: true },
  lastName: { type: String ,required: true},
  age: { type: Number ,required: true},
  country: { type: String ,required: true},
  email : {type: String , required : true , unique:true},
  password: { type: String ,required: true},
  role: {type: mongoose.Schema.ObjectId , ref :"Role"}
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

usersSchema.pre("save", async function () {
  // `this` refers to the newly created user before saving
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.email = this.email.toLowerCase();
  this.password = hashedPassword
});

const rolesSchema = new mongoose.Schema({
  role:{type:String , required:true},
  Permissions :[String]
})


module.exports.Users = mongoose.model("User", usersSchema);
module.exports.Articles = mongoose.model("Article", articlesSchema);
module.exports.Comments = mongoose.model("Comment", commentsSchema);
module.exports.Roles = mongoose.model("Role", rolesSchema);
