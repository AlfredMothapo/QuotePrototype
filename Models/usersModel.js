const bcrypt = require('bcrypt');
export class UsersModel {
   
    static loginUser(req,dbCon)
    {
        const saltRounds = 10;
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    return reject(error)
                };
                connection.query("Call getUser(?)",[req.body.email],(err,rows)=>{
                    if(err) {
                        connection.release()
                        return reject(err)
                    }
                    if(rows[0].length>0)
                    {
                        var hashedPwd = rows[0][0].password
                        var results = bcrypt.compareSync(req.body.password, hashedPwd)
                        if(results)
                        {
                            //get the actual user
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
}