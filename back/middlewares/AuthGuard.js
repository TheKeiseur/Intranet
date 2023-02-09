import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// MIDDLEWARES  VERIFICATION SI LE TOKEN EXISTE
export const authGuard = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verif = jwt.verify(token, process.env.AUTH_SECRET);
    req.auth = {
      userId: verif.id,
      email: verif.email,
      isAdmin: verif.isAdmin
    }
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
}