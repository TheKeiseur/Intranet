import express from "express";

import { Router } from "express";

const router = Router();

import HomeController from "../controllers/home.js";
import AdminController from "../controllers/admin.js";




// Déclaration des routes

// GET
router.get("/", HomeController);
router.get("/content/users", AdminController);

// POST


export default router;
