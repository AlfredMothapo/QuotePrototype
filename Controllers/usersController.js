import {UsersModel} from "../Models/usersModel";
import {Config} from '../configuration';
var jwt = require('jwt-simple');

const stringify = require('json-stringify-safe');

export class UsersController{

    static loginUser(req,res,dbCon)
    {
        UsersModel.loginUser(req,dbCon).then((user)=>
        {
            if(user.length>0){
                var payload = {subject:{id:user[0].id,name:user[0].name,type:user[0].user_type,isAdmin:user[0].is_admin}}
                var token = jwt.encode(payload,Config.getSecretKey())
                res.send(stringify({token:token},null,1))
            }
            else{
                res.sendStatus(401)
            }
        },(error)=>{
            res.sendStatus(401)
        })
    }
    static getAllUsers(dbCon,res)
    {
        UsersModel.getAllUsers(dbCon).then((rows)=>
        {
            res.send(stringify(rows,null,1))
        },
        (error)=>{
            res.sendStatus(500)
        })
    }
    static addUser(req,res,dbCon)
    {
        UsersModel.insertUser(dbCon,req).then(()=>
        {
            res.send({message:"success"})
        },
        (error)=>{
            res.sendStatus(500)
    })
    }
    static updateUserType(req,res,dbCon)
    {
       UsersModel.updateUserType(dbCon,req).then(()=>
        {
            res.send({message:"success"})
        },
        (error)=>{
            res.sendStatus(500)
        })
    }
    static deleteUser(req,res,dbCon)
    {
        UsersModel.deleteUser(dbCon,req.params.id).then(()=>
        {
            res.send({message:"success"})
        },
        (error)=>{
            res.sendStatus(500)
        })
    }

}