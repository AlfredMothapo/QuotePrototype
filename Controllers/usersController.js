import {UsersModel} from "../Models/usersModel"
var jwt = require('jwt-simple');
const stringify = require('json-stringify-safe')
const secretKey='123'//must go to config
export class UsersController{

    static loginUser(req,res,dbCon)
    {
        UsersModel.loginUser(req,dbCon).then((user)=>
        {
            if(user.length>0){

                var payload = {subject:{name:user[0].name,type:user[0].user_type,isAdmin:user[0].is_admin}}
                var token = jwt.encode(payload,secretKey)
                res.send(stringify({token:token},null,1))
            }
            else{
                res.sendStatus(401)
            }
        },(error)=>{
            res.sendStatus(401)
        })
    }

}