import {connectToMongo} from "../Models/db.js";
import {UserModel} from "../Models/User.js";
import  {findByOne, getAllUsers} from '../service/userService.js'

connectToMongo().then(r => console.log(r));
/**
 * users http://{hostname}:{port}/users
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export  async function users(req,res){
    const users = await UserModel.find();
    console.log(users);
    let response = {}
    response = await getAllUsers()

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
   let rep = {}
    rep = await findByOne(id);
   // let nom =  ....
    return  res.json(rep)
}

