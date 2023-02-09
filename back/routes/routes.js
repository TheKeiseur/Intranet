import { Router } from "express";
import HomeController from "../controllers/homeController.js";
import { getUserById, login, randomUser, users, editProfil} from '../controllers/userController.js';
import { authGuard } from '../middlewares/AuthGuard.js';

const router = Router();

// GET
router.get("/", HomeController);
router.get("/users", authGuard, users);
router.get("/user/:id", authGuard, getUserById);
router.get("/random-user", authGuard, randomUser);

// POST
router.post("/login", login);

// PUT
router.put('/user/:id', editProfil)


export default router;
