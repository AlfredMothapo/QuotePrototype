const mysql = require("mysql")

export class Config {
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
    static getSecretKey()
    {
        return '123'
    }
    static getsaltRounds()
    {
        return 10;
    }
}