const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");


app.use(
    bodyParser.urlencoded({
        extended:false
    })
);
app.use(bodyParser.json())

//init database once made

app.use(passport.initialize());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/server", (req,res) => {
    res.send({express:"Connected"})
})