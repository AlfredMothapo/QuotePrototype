const bcrypt = require('bcrypt');
export class UsersModel {
   
    static loginUser(req,dbCon)
    {
        const saltRounds = 10;
        return new Promise((resolve,reject)=>{
            var db_user =dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    throw err
                    console.log("Unable to connect to db")
                    connection.release()
                    return reject(error)
                };
                connection.query("Call getUser(?)",[req.body.email],(err,rows)=>{
                    if(err) {
                        throw err
                    }
                    if(rows[0].length>0)
                    {
                        var hashedPwd = rows[0][0].password
                        var results = bcrypt.compareSync(req.body.password, hashedPwd)
                        if(results)
                        {
                            return resolve(rows[0])
                        }
                        //wrong password
                        else
                        {
                            return reject("Unable to authorize")
                        }
                    }
                    // User password not found due to wrong email
                    return reject("Unable to authorize")
                })
            })
        })
    }
    static addUser()
    {
        
    }

}