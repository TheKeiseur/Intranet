import express from "express";
import { Router } from "express";
const router = Router();



import HomeController from "../controllers/homeController.js";


import {users, getUserById,login,randomUser} from '../controllers/userController.js'
import {guard} from '../service/userService.js'


// GET
router.get("/", HomeController);
router.get("/users", users);
router.get("/user/:id", getUserById);
router.get("/random-user", randomUser);


// POST
router.post("/login", login);



export default router;
