import {connectToMongo} from "../Models/db.js";
import {UserModel} from "../Models/User.js";
 
import  {findById, getAllUsers,loginService,getRandomUser} from '../service/userService.js'
 
 
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
        if(response.error){
            return res.status(response.error).json({ message: response.message });
        }else{
            let obj = {
                idToken:response.token,
                expiresIn: EXPIRESIN,
                id:response.id,
                photo : response.photo,
                isAdmin: response.isAdmin
            }
            return res.status(200).json(obj)
        }
    }else{
        res.status(400).json({ message: "Invalid credentials" });
    }
}

/**
 * Login http://{hostname}:{port}/random-user
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
export  async function randomUser(req,res){
    let response = await getRandomUser()

    return  res.json(response)
}



