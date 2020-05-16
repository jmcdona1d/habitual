const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
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
app.use(express.json())

connect()

app.use(passport.initialize());

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/server", (req,res) => {
    res.send({express:"Connected"})
})

app.get("/view", async(req, res)=>{
    const rows = await readEntries()
    res.send(JSON.stringify(rows))
})

app.post("/add", async(req,res)=>{
    let result = {}
    try{
        const reqJson = req.body;
        await createEntry(reqJson.data)
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

app.get("/server", (req,res) => {
    res.send({express:"Connected"})
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

async function readEntries(){
    try{
        const results = await client.query(`select * from public."Entries";`)
        return results.rows
    }
    catch(e){
        console.error(`Failed to add ${e}`)
        return [];
    }
}

async function createEntry(entry){
    try{
        await client.query(`INSERT INTO public."Entries"(
            id, data)
            VALUES (${entry})`)
        return true
    }
    catch(e){
        return false
    }
}