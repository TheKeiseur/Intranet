import {connectToMongo} from "../Models/db.js";
import {UserModel} from "../Models/User.js";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


dotenv.config();
const {AUTH_SECRET,EXPIRESIN } = process.env;
connectToMongo().then(r => r);


export async function findById(id){
    const user = await UserModel.findOne({id:id });
    return user;
}

export async function getAllUsers(){
    const users = await UserModel.find();
    return users;
}

export async function loginService(email,password){
    const user = await UserModel.findOne({email : email});


    if(user){
        let userPassHash = user.password
        let id = user.id
        const verified = bcrypt.compareSync(password, userPassHash);

        if( verified){
            let date = new Date();
            let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

            const info ={
                id:id,
                email: email,
                period: dateString,
            }
            const token = jwt.sign(
                info,
                AUTH_SECRET,
                { expiresIn: EXPIRESIN }   // validité temps
            );
            user.token = token

            return  user
        }else {
            return {
                error: 401,
                message: "Unauthorized - Incorrect password"
            }
        }
    }else{
        return {
            error: 404,
            message: "User not found"
        }
    }
}


// MIDDLEWARES  VERIFICATION SI LE TOKEN EXISTE
export const guard = (req,res,next) =>{
    const token = req.headers.idToken;

    try {
        const verif = jwt.verify(token, AUTH_SECRET);

        // console.log(verif, 'is valid!');
        next();
    }
    catch (err) {
        return res.json( `401 : Error verifying token … ${err.message}`)
    }
}
