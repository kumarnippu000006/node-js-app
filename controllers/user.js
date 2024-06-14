import { User } from "../models/user.js";
import errorHandler from "../middlewares/error.js";
import bcrypt from "bcrypt";

import { sendCookie } from "../utils/featurs.js";
export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		console.log(req.query);
		res.json({
			success: true,
			users,
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select("+password");
		if (!user) {
			return next(new errorHandler("Invalid Email or password", 400));
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return next(new errorHandler("Invalid Email or password", 400));
		}
		sendCookie(user, res, `Welcome back, ${user.name} `, 200);
	} catch (error) {
		next(error);
	}
};

export const logout = (req, res) => {
	try {
		res
			.status(200)
			.cookie("token", "", {
				expires: new Date(Date.now()),
			})
			.json({
				success: true,
				message: "Logout",
			});
	} catch (error) {
		next(error);
	}
};

export const register = async (req, res) => {
	try {
		//req.body accepts data from postman
		const { name, email, password } = req.body;
		let user = await User.findOne({ email });
		if (user) {
			return next(new errorHandler("user already Exist", 400));
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user = await User.create({ name, email, password: hashedPassword });
		sendCookie(user, res, "registered Successfully", 201);
	} catch (error) {
		next(error);
	}
};

export const updateUser = async (req, res) => {
	try {
		// const { id } = req.body;
		const { id } = req.params;
		const user = await User.findById(id);
		console.log(req.params);
		res.json({
			success: true,
			message: "Updated",
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res) => {
	try {
		// const { id } = req.body;
		const { id } = req.params;
		const user = await User.findById(id);
		// await user.remove();

		res.json({
			success: true,
			message: "Deleted",
		});
	} catch (error) {
		next(error);
	}
};
export const getMyprofile = async (req, res) => {
	try {
		res.status(200).json({
			success: true,
			user: req.user,
		});
	} catch (error) {
		next(error);
	}
};

/* export const getUserDetails = async (req, res) => {
	// const { id } = req.body;
	const { id } = req.params;
	const user = await User.findById(id);
	console.log(req.params);
	res.json({
		success: true,
		user,
	});
}; 

export const specialFunc = (req, res) => {
	res.json({
		success: true,
		message: "just ok",
	});
};

*/
