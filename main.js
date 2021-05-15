const express = require("express");

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

// run the server locally on the desired port, use the following link to open up the server http://localhost:5000`
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
