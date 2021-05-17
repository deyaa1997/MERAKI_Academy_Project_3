const express = require("express");
const { v4: uuidv4 } = require("uuid");
const db = require("./db")
const { Users, Articles } = require("./schema");
const app = express();
const port = 5000;

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
// to get all articles
app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});

// to get articles by author
app.get("/articles/search_1", (req, res) => {
  const articlesSearch_1 = [];
  for (let x = 0; x < articles.length; x++) {
    if (articles[x].author === req.query.author) {
      articlesSearch_1.push(articles[x]);
    }
  }
  if (articlesSearch_1.length === 0) {
    res.json("Not Found");
  }
  if (articlesSearch_1.length > 0) {
    res.status = 200;
    res.json(articlesSearch_1);
  }
});

// to get articles by Id

app.get("/articles/search_2", (req, res) => {
  const articlesSearch_2 = [];
  for (let x = 0; x < articles.length; x++) {
    if (articles[x].id == req.query.id) {
      articlesSearch_2.push(articles[x]);
    }
  }
  if (articlesSearch_2.length === 0) {
    res.json("Not Found");
  }
  if (articlesSearch_2.length > 0) {
    res.status = 200;
    res.json(articlesSearch_2);
  }
});

// To Create New Article

app.post("/articles", (req, res) => {
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
  res.status(201);
  const newArticle = {
    id: randId,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };
  articles.push(newArticle);
  res.json(newArticle);
});

// Update An Article By Id
app.put("/articles/:id", (req, res) => {
  let find = false;
  let i;
  for (let x = 0; x < articles.length; x++) {
    if (req.params.id == articles[x].id) {
      find = true;
      i = x;
    }
  }
  if (find === true) {
    res.status(200);
    if (req.body.title) {
      articles[i].title = req.body.title;
    }
    if (req.body.description) {
      articles[i].description = req.body.description;
    }
    if (req.body.author) {
      articles[i].author = req.body.author;
    }
    res.json(articles[i]);
  } else {
    res.status(404);
    res.json("Not Found :- You cant update");
  }
});

// Delete An Article By Id
app.delete("/articles/:id", (req, res) => {
  let find = false;
  let i;
  for (let x = 0; x < articles.length; x++) {
    if (req.params.id == articles[x].id) {
      find = true;
      i = x;
    }
  }
  if (find === true) {
    let articleId = articles[i].id;
    articles.splice(i, 1);
    res.json({
      success: true,
      massage: `Success Delete article with id => ${articleId}`,
    });
  } else {
    res.status(404);
    res.json("Not Found :- You cant delete");
  }
});

// Delete An Article By Author
app.delete("/articles", (req, res) => {
  let find = false;
  for (let x = 0; x < articles.length; x++) {
    if (req.body.author == articles[x].author) {
      find = true;
      articles.splice(x, 1);
      x = x - 1;
    }
  }
  if (find === true) {
    res.json({
      success: true,
      massage: `Success delete all the articles for the author => ${req.body.author}`,
    });
  } else {
    res.status(404);
    res.json("Not Found :- You cant delete");
  }
});

// run the server locally on the desired port, use the following link to open up the server http://localhost:5000`
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
