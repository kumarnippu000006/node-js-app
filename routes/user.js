import express from "express";
import { User } from "../models/user.js";
import {
	deleteUser,
	getAllUsers,
	getMyprofile,
	login,
	logout,
	register,
	updateUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyprofile);

/* router
	.route("/userid/:id")
	.get(getMyprofile)
	.put(updateUser)
	.delete(deleteUser); */
export default router;
