import {connectToMongo} from "../Models/db.js";
import {UserModel} from "../Models/User.js";
import  {findById, getAllUsers,loginService} from '../service/userService.js'
import dotenv from "dotenv";


dotenv.config();
const {EXPIRESIN } = process.env;


/**
 * users http://{hostname}:{port}/users
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export  async function users(req,res){
    let response = await getAllUsers()

    return  res.json(response)
}

/**
 * users http://{hostname}:{port}/user/1
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export   async function getUserById(req,res){
    let id = 1
   let rep = await findById(id);
   // let nom =  ....
    return  res.json(rep)
}

/**
 * Login http://{hostname}:{port}/login
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export  async function login(req,res){
    let {email, password } = req.body;
    let response = await loginService(email,password);
    // return res.json(response) // to show user info

    if(typeof response === 'object' && response !== null){
            let token = response.token

            let obj = {
                idToken:token,
                expiresIn: EXPIRESIN
            }
        return res.json(obj)
    }else{
        res.json("INVALID CREDENTIAL")
    }
}

