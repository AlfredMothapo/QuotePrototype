import { DatabaseConnection } from "./configuration";
import { connect } from "net";
import { QuotesController } from "./Controllers/quotesController";
import { UsersController } from "./Controllers/usersController";

var cors = require('cors')
var express = require("express")
var app = express();
var jwt = require('jwt-simple')
app.use(cors());
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const bodyParser = require('body-parser');
//MySQL Connection
const dbConnection = DatabaseConnection.getConnectionPool()
const jsonParser = bodyParser.json()

//middlewares
function checkAuth(req,res,next){
    //check for header first
    if(!req.header('authorization')){
        return res.sendStatus(402) //Unauthorized
    }
    //authorization exists.
    var token = req.header('authorization').split(' ')[1]  //get the actual token.
    var payload = jwt.decode(token,'123')

    if(!payload){
        return res.sendStatus(402) //Unauthorized 
    }
    //payload exists , just login the user?
}
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
    QuotesController.deleteQuote(req,res,dbConnection)
});
app.post('/login',jsonParser,(req,res)=>{
    UsersController.loginUser(req,res,dbConnection)
})
//routes-end
app.listen(8000,()=>{console.log("Server started at localhost : 8000")})