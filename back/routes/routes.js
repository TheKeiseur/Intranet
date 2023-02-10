import { Router } from "express";
import HomeController from "../controllers/homeController.js";
import { getUserById, login, randomUser, users, editProfil, deleteUser,  create,nbUser,getCategories} from '../controllers/userController.js';
import { authGuard } from '../middlewares/AuthGuard.js';

const router = Router();

// GET
router.get("/", HomeController);
router.get("/users", users);
router.get("/user/:id", authGuard, getUserById);
router.get("/random-user", authGuard, randomUser);
router.get("/user-count", nbUser);

router.get("/categories",getCategories);


// POST
router.post("/login", login);
router.post("/admin/add", authGuard, create)

// PUT
router.put('/user/:id', authGuard, editProfil)
//DELETE
router.delete("/admin/delete/:id",authGuard, deleteUser)


export default router;
