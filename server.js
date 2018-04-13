import { DatabaseConnection } from "./configuration"
import { connect } from "net";
import { QuotesController } from "./Controllers/quotesController"

var cors = require('cors')
var express = require("express")
var app = express();

app.use(cors());
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
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
    console.log(req.body)
    QuotesController.insertQuote(req,res,dbConnection)
  });
app.post('/updateQuote', jsonParser, (req, res) => {
    QuotesController.updateQuote(req,res,dbConnection)
});
app.delete('/deleteQuote/:id',(req, res) => {
    console.log(req.body)
    QuotesController.deleteQuote(req,res,dbConnection)
});
//routes-end
app.listen(8000,()=>{console.log("Server started at localhost : 8000")})