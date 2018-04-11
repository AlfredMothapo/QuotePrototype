import { DatabaseConnection } from "./configuration"
import { connect } from "net";
import { QuotesController } from "./Controllers/quotesController"

var express = require("express")
var app = express();

const bodyParser = require('body-parser');
//MySQL Connection
const dbConnection = DatabaseConnection.getConnectionPool()
const jsonParser = bodyParser.json()
//routes -begin
app.get("/",(req,res)=>
{
    res.send("Hello world")
})
app.get("/getAllQuotes",(req,res)=>
{
    QuotesController.getAllQuotes(dbConnection,res)
})
app.post('/insertQuote', jsonParser, (req, res) => {
    QuotesController.insertQuote(req,res,dbConnection)
  });
app.post('/updateQuote', jsonParser, (req, res) => {
    QuotesController.updateQuote(req,res,dbConnection)
});
app.delete('/deleteQuote', jsonParser, (req, res) => {
    QuotesController.deleteQuote(req,res,dbConnection)
});
//routes-end
app.listen(8000,()=>{console.log("Server started at localhost : 8000")})