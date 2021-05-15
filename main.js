const express = require ("express");

const app = express();
const port = 5000 ; 

// run the server locally on the desired port, use the following link to open up the server http://localhost:5000`
app.listen(port , ()=> {
    console.log(`Example app listening at http://localhost:${port}`);
})