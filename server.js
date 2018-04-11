import { DatabaseConnection } from "./configuration"
import { connect } from "net";
import { QuotesController } from "./Controllers/quotesController"

var express = require("express")
var app = express();

//MySQL Connection
const dbConnection = DatabaseConnection.getConnectionPool()

//routes -begin
app.get("/",(req,res)=>
{
    res.send("Hello world")
})
app.get("/getAllQuotes",(req,res)=>
{
    QuotesController.getAllQuotes(dbConnection,res)
})
//routes-end
app.listen(8000,()=>{console.log("Server started at localhost : 8000")})