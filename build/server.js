"use strict";

var _configuration = require("./configuration");

var _net = require("net");

var _quotesController = require("./Controllers/quotesController");

var express = require("express");
var app = express();

//MySQL Connection
const dbConnection = _configuration.DatabaseConnection.getConnectionPool();
// .getConnection((error,connection)=>{
//     if(error) 
//     {
//         console.log("Unable to connect")
//         connection.release()
//     };
//     connection.query("Call getAllQuotes",(err,rows,fields)=>{
//         console.log(fields);
//     })
// });

//routes -begin
app.get("/", (req, res) => {
    res.send("Hello world");
});
app.get("/getAllQuotes", (req, res) => {
    _quotesController.QuotesController.getAllQuotes(dbConnection, res);
});
//routes-end
app.listen(8000, () => {
    console.log("Server started at localhost : 8000");
});
//# sourceMappingURL=server.js.map