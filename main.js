const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db");
const { Users, Articles, Comments , Roles } = require("./schema");
const app = express();
const port = 5000;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Error, Mongoose } = require("mongoose");

// a middleware that enables us to read the received JSON data
app.use(express.json());
const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const secret = process.env.SECRET
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      const err = new Error("The token is invalid or expired");
      err.status = 403;
      res.json({
        message:err.message,
        status:err.status
      })
    }if (result){
      req.token = result
      console.log(result)
      next()
    }
  });
};

console.log(process.env.DB_URI);
console.log(process.env.SECRET);

// to get all articles
app.get("/articles", (req, res) => {
  Articles.find({})
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// to get articles by author
app.get("/articles/search_1", async (req, res) => {
  let authorId;
  await Users.findOne({ firstName: req.query.author })
    .then((result) => {
      authorId = result._id;
      console.log(authorId);
    })
    .catch((err) => {
      console.log(err);
    });

  Articles.find({ author: authorId })
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// to get articles by Id

app.get("/articles/search_2", (req, res) => {
  Articles.findOne({ _id: req.query.id })
    .populate("author", "firstName")
    .exec()
    .then((result) => {
      res.status(200);
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// To Create New Article

app.post("/articles", async (req, res) => {
  // Make Random Id
  let randId = uuidv4();
  for (let x = 0; x < articles.length; x++) {
    if (articles[x].id === randId) {
      // Change random id again
      randId = uuidv4();
      // To Check Array from the begin again x= -1 + 1 >> x will back to 0
      x = -1;
    }
  }

  let author1;

  await Users.findOne({})
    .then((result) => {
      author1 = result;
      console.log(author1);
    })
    .catch((err) => {
      console.log(err);
    });

  const article = new Articles({
    id: randId,
    title: req.body.title,
    description: req.body.description,
    author: author1._id,
  });

  article
    .save()
    .then((result) => {
      res.json(result);
      res.status(201);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Update An Article By Id
app.put("/articles/:id", async (req, res) => {
  Articles.updateOne(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
    }
  )
    .then((result) => {
      res.send("Updated Complete");
    })
    .catch((err) => {
      res.send(err);
    });
});

// Delete An Article By Id
app.delete("/articles/:id", (req, res) => {
  //let find = false;
  //let i;
  //for (let x = 0; x < articles.length; x++) {
  //  if (req.params.id == articles[x].id) {
  //    find = true;
  //    i = x;
  //  }
  //}
  //if (find === true) {
  //  let articleId = articles[i].id;
  //  articles.splice(i, 1);
  //  res.json({
  //    success: true,
  //    massage: `Success Delete article with id => ${articleId}`,
  //  });
  //} else {
  //  res.status(404);
  //  res.json("Not Found :- You cant delete");
  //}

  Articles.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.send("Deleted Complete");
    })
    .catch((err) => {
      res.send(err);
    });
});

// Delete An Article By Author
app.delete("/articles", async (req, res) => {
  //  let find = false;
  //  for (let x = 0; x < articles.length; x++) {
  //    if (req.body.author == articles[x].author) {
  //      find = true;
  //      articles.splice(x, 1);
  //      x = x - 1;
  //    }
  //  }
  //  if (find === true) {
  //    res.json({
  //      success: true,
  //      massage: `Success delete all the articles for the author => ${req.body.author}`,
  //    });
  //  } else {
  //    res.status(404);
  //    res.json("Not Found :- You cant delete");
  //  }
  let authorId;

  await Users.findOne({ firstName: req.body.author })
    .then((result) => {
      authorId = result._id;
      console.log(authorId);
    })
    .catch((err) => {
      console.log(err);
    });

  Articles.deleteOne({ author: authorId })
    .then((result) => {
      res.send("Deleted Complete");
    })
    .catch((err) => {
      res.send(err);
    });
});

// Create Role 
app.post("/role", (req, res ) =>{
  const {role , permissions } = req.body

  const newRole = new Roles({
    role,
    permissions : permissions
  })

  newRole.save().then((result)=>{
    res.json(result)
  }).catch((err)=>{
    res.json(err)
  })

})


// Create New Author
app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password , role } = req.body;

  const author = new Users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role
  });
  author
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Check Email and Password
app.post("/login", (req, res) => {
  Users.findOne({ email: req.body.email })
    .then((result) => {
      if (result === null) {
        const err = new Error("The email doesn't exist");
        err.status = 404;
        res.json({
          message: err.message,
          status: err.status,
        });
      } else {
        let id = result._id;
        let country = result.country;
        Roles.findOne({_id : result.role}).then((resu)=>{
          let r = resu.role
          let p = resu.permissions

        bcrypt.compare(req.body.password, result.password, (err, result) => {
          if (result === false) {
            const err = new Error("The password you’ve entered is incorrect");
            err.status = 403;
            res.json({
              message: err.message,
              status: err.status,
            });
          } else {
            Roles.findOne({role:"admin"})
            const payload = {
              userId: id,
              country: country,
              role: {role: r , permissions: p}
            };
            console.log(payload)
            const options = { expiresIn: "60m" };

            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);

            res.json({ token: token });
          }})
        });
      }
    })
    .catch((err) => {
      res.json(err);
    })
});

app.post("/articles/:id/comments",authentication, async (req, res) => {
  const comment1 = new Comments({
    comment: req.body.comment,
    commenter: req.body.commenter,
  });

  await comment1
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });

  let comment;
  await Comments.findOne({
    comment: req.body.comment,
    commenter: req.body.commenter,
  })
    .then((result) => {
      comment = result;
      console.log(comment);
    })
    .catch((err) => {
      res.json(err);
    });

  Articles.updateOne(
    { _id: req.params.id },
    { $push: { comments: comment._id } }
  )
    .then((result) => {
      res.status(201);
    })
    .catch((err) => {
      res.send(401);
      res.json(err);
    });
});

app.use((err, req, res, next) => {
  // set the status code
  res.status(err.status);
  // send the response in JSON format
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

// run the server locally on the desired port, use the following link to open up the server http://localhost:5000`
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
