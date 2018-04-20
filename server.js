import { Config } from "./configuration";
import { connect } from "net";
import { QuotesController } from "./Controllers/quotesController";
import { UsersController } from "./Controllers/usersController";
const stringify = require('json-stringify-safe')

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
const dbConnection = Config.getConnectionPool()
const jsonParser = bodyParser.json()
//routes -begin
app.get("/",(req,res)=>
{
    res.send("Hello world")
})
//quote management routes
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
app.delete('/deleteQuote/:id',(req, res) => {
    QuotesController.deleteQuote(req,res,dbConnection)
});
app.post('/login',jsonParser,(req,res)=>{
    UsersController.loginUser(req,res,dbConnection)
})
//user management routes
app.get("/getAllUsers",(req,res)=>
{
    UsersController.getAllUsers(dbConnection,res)
})
app.post('/addUser', jsonParser, (req, res) => {
   UsersController.addUser(req,res,dbConnection)
  });
app.post('/updateUserType', jsonParser, (req, res) => {
    UsersController.updateUserType(req,res,dbConnection)
});
app.delete('/deleteUser/:id',(req, res) => {
    UsersController.deleteUser(req,res,dbConnection)
});
//routes-end
app.listen(8000,()=>{console.log("Server started at localhost : 8000")})