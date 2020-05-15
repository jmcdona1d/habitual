const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config();

const Client = require('pg').Client;
const client = new Client({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    host:"localhost",
    port: 5432,
    database: process.env.DB_NAME
})

app.use(
    bodyParser.urlencoded({
        extended:false
    })
);
app.use(bodyParser.json())

connect()

async function connect(){
    try{
        await client.connect();
        console.log("connected to postgres")
    }
    catch(e){
        console.error(`failed to connect ${e}`)
    }
}
//init database once made
app.use(passport.initialize());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/server", (req,res) => {
    res.send({express:"Connected"})
})