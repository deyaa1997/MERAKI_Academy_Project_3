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

app.get("/articles", (req, res) => {
  res.status(200);
  res.json(articles);
});

// run the server locally on the desired port, use the following link to open up the server http://localhost:5000`
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
