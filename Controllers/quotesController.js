import { QuotesModel } from "../Models/quotesModel"
const stringify = require('json-stringify-safe')

export class QuotesController {

    static getAllQuotes(dbCon,res)
    {
        QuotesModel.getAllQuotes(dbCon).then((rows)=>
        {
            res.send(stringify(rows,null,1))
        })
    }
    static insertQuote(req,res,dbCon)
    {
        QuotesModel.insertQuote(dbCon,req).then(()=>
        {
            res.sendStatus(200)
        })
    }
    static updateQuote(req,res,dbCon)
    {
        QuotesModel.updateQuote(dbCon,req).then(()=>
        {
            res.sendStatus(200)
        })
    }
    static deleteQuote(req,res,dbCon)
    {
        QuotesModel.deleteQuote(dbCon,req.params.id).then(()=>
        {
            res.sendStatus(200)
        })
    }
}