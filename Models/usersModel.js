import {Config} from '../configuration';

const bcrypt = require('bcrypt');

export class UsersModel {
   
    static loginUser(req,dbCon)
    {
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
                            return reject()
                        }
                    }
                    // User password not found due to wrong email
                    return reject()
                })
            })
        })
    }
    static getAllUsers(dbCon)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    return reject(error);
                };
                connection.query("Call getAllUsers",(err,rows)=>{
                    if(err) {
                        connection.release()
                        return reject(err)
                    }
                    connection.release()
                    return resolve(rows[0])
                })
            })
        }) 
    }
    static insertUser(dbCon,req)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    return reject(error);
                };
                connection.query("Call addUser(?,?,?,?)",[req.body.Name,bcrypt.hashSync(req.body.Password,Config.getsaltRounds()),req.body.UserType,req.body.Email],(err,rows)=>{
                    if (err)
                    {
                        connection.release()
                        return reject(err);
                    }
                    connection.release()
                    return resolve()
                })
            })
        }) 
    }
    static updateUserType(dbCon,req)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    return reject(error);
                };
                connection.query("Call updateUserType(?,?)",[req.body.id,req.body.user_type],(err,rows)=>{
                    if (err)
                    {
                        connection.release()
                        return reject(err);
                    }
                    connection.release()
                    return resolve()
                })
            })
        }) 
    }
    static deleteUser(dbCon,id)
    {
        return new Promise((resolve,reject)=>{
            dbCon.getConnection((error,connection)=>{
                if(error) 
                {
                    connection.release()
                    return reject(error);
                };
                connection.query("Call deleteUser(?)",[id],(err,rows)=>{
                    if (err)
                    {
                        connection.release()
                        return reject(err);
                    }
                    connection.release()
                    return resolve()
                })
            })
        }) 
    }
}