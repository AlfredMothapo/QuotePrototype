export class QuotesModel {

    static getAllQuotes(dbCon)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    console.log("Unable to connect to dbpool")
                    connection.release()
                    return reject(error);
                };
                connection.query("Call getAllQuotes",(err,rows)=>{
                    if(err) {
                        throw err
                        connection.release()
                    }
                    return resolve(rows[0])
                })
            })
        }) 
    }
    static insertQuote(dbCon,req)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    console.log("Unable to connect to dbpool")
                    connection.release()
                    return reject(error);
                };
                connection.query("Call insertQuote(?,?,?,?)",[req.body.quote,req.body.attributed_to,req.body.source,req.body.date],(err,rows)=>{
                    if (err)
                    {
                        throw err;
                    }
                    connection.release()
                    return resolve()
                })
            })
        }) 
    }
    static updateQuote(dbCon,req)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    console.log("Unable to connect to dbpool")
                    connection.release()
                    return reject(error);
                };
                connection.query("Call updateQuote(?,?,?,?,?)",[req.body.id,req.body.quote,req.body.attributed_to,req.body.source,req.body.date],(err,rows)=>{
                    if (err)
                    {
                        throw err;
                    }
                    connection.release()
                    return resolve()
                })
            })
        }) 
    }
    static deleteQuote(dbCon,req)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    console.log("Unable to connect to dbpool")
                    connection.release()
                    return reject(error);
                };
                connection.query("Call deleteQuote(?)",[req.body.id],(err,rows)=>{
                    if (err)
                    {
                        throw err;
                    }
                    connection.release()
                    return resolve()
                })
            })
        }) 
    }
    
}