"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuotesController = undefined;

var _quotesModel = require("../Models/quotesModel");

const stringify = require('json-stringify-safe');

class QuotesController {

    static getAllQuotes(dbCon, res) {
        _quotesModel.QuotesModel.getAllQuotes(dbCon).then(rows => {
            res.send(stringify(rows, null, 1));
        });
    }
}
exports.QuotesController = QuotesController;
//# sourceMappingURL=quotesController.js.map