'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
const mysql = require("mysql");

class DatabaseConnection {
    static getConnectionPool() {
        var pool = mysql.createPool({
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'quotesdb'
        });
        return pool;
    }
}
exports.DatabaseConnection = DatabaseConnection;
//# sourceMappingURL=configuration.js.map