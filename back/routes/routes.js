import express from "express";
import { Router } from "express";
const router = Router();



import HomeController from "../controllers/homeController.js";

import {users, getUserById} from '../controllers/userController.js'


// GET
router.get("/", HomeController);
router.get("/users", users);
router.get("/user/:id", getUserById);

// POST


export default router;
