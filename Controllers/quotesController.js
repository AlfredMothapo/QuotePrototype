import { QuotesModel } from "../Models/quotesModel"
const stringify = require('json-stringify-safe')

export class QuotesController {

    static getAllQuotes(dbCon,res)
    {
        QuotesModel.getAllQuotes(dbCon).then((rows)=>{
            res.send(stringify(rows,null,1))
        })
    }
}