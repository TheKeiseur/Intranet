import {connectToMongo} from "../Models/db.js";
import {UserModel} from "../Models/User.js";

connectToMongo().then(r => console.log(r));


export async function findById(id){
    const user = await UserModel.findOne({id:id });
    return user;
}

export async function getAllUsers(){
    const users = await UserModel.find();
    return users;
}

