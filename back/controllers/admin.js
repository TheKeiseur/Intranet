import {connectToMongo} from "../Models/db.js";
import {UserModel} from "../Models/User.js";
import dotenv from "dotenv";

/**
 * addUser http://{hostname}:{port}/admin/add
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export default async function add(req,res){
    connectToMongo().then(r => console.log(r));
    console.log("bienvenue ")


    const users = await UserModel.find();
    console.log(users);
    return  res.json(users)

}
