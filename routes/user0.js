import express from "express";
import { User } from "../models/user.js";
const router = express.Router();
router.get("/users/all", async (req, res) => {
	const users = await User.find({});
	console.log(req.query);
	res.json({
		success: true,
		users,
	});
});

router.post("/users/new", async (req, res) => {
	//req.body accepts data from postman
	const { name, email, Password } = req.body;
	const users = User.create({
		name,
		email,
		Password,
	});
	res.status(201).cookie("test2", "lol").json({
		success: true,
		message: "Registered successfully",
	});
});

router.get("/userid/special", (req, res) => {
	res.json({
		success: true,
		message: "just ok",
	});
});

//Dynamic route(always put dynamic route in last)
router.get("/userid/:id", async (req, res) => {
	// const { id } = req.body;
	const { id } = req.params;
	const user = await User.findById(id);
	console.log(req.params);
	res.json({
		success: true,
		user,
	});
});

export default router;
