import express from "express";
const router = express.Router();
import { verifyAccessToken, isNotVerified } from "../middlewares/verifyToken";
import Users from "../controllers/user";
import Validator from '../middlewares/validator'
import UserExists from '../middlewares/userExists'

router.get("/", Users.getUsers);

router.post("/signup", Validator.signup,UserExists.registerExists, Users.registerUser);
router.post("/login", Validator.login ,UserExists.loginExists ,isNotVerified, Users.loginUser);
router.delete("/logout",verifyAccessToken, Users.logout);
router.get("/verify/signup", Users.verifyUser);
router.delete("/:id", verifyAccessToken, Users.deleteUser);


export default router;
