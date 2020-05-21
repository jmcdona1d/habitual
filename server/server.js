const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const passport = require("passport");
const dotenv = require('dotenv');
dotenv.config();
const Client = require('pg').Client;
const entryBusinessService = require('./entryBusinessService')

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
app.use(express.json())

connect()

app.use(passport.initialize());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/server", (req,res) => {
    res.send({express:"Connected"})
})

app.get("/entry", async(req, res)=>{
    const rows = await entryBusinessService.readEntries(client)
    res.send(JSON.stringify(rows))
})

app.post("/entry", async(req,res)=>{
    let result = {}
    try{
        const reqJson = req.body;
        await entryBusinessService.createEntry(client, reqJson.data)
        result.sucess = true
    }
    catch(e){
        console.error(e)
        result.sucess =false
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
})

async function connect(){
    try{
        await client.connect();
        console.log("connected to postgres")
    }
    catch(e){
        console.error(`failed to connect ${e}`)
    }
}