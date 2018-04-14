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
                connection.query("Call insertQuote(?,?,?,?)",[req.body.Quote,req.body.Attributed_to,req.body.Source,req.body.Year],(err,rows)=>{
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
                connection.query("Call updateQuote(?,?,?,?,?)",[req.body.id,req.body.Quote,req.body.Attributed_to,req.body.Source,req.body.Year],(err,rows)=>{
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
    static deleteQuote(dbCon,id)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    console.log("Unable to connect to dbpool")
                    connection.release()
                    return reject(error);
                };
                connection.query("Call deleteQuote(?)",[id],(err,rows)=>{
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