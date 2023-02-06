import mongoose from "mongoose";
const { Schema, model } = mongoose;


const userSchema = new Schema({
    id: { type: String, required: true,autoIncrement : true},  
    gender: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    birthdate: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    photo: { type: String, required: true },
    category: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default:false }
});

export const UserModel = model("users", userSchema);
