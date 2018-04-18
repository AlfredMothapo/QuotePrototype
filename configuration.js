const mysql = require("mysql")

export class DatabaseConnection {
    static getConnectionPool()
    {
        var pool = mysql.createPool({
            connectionLimit: 500,
            host:'localhost',
            user:'root',
            password:'',
            database:'quotesdb'
        })
        return pool;
    }
}