import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
export const newTask = async (req, res, next) => {
	try {
		const { title, description } = req.body;
		/* const task=new Task({title});
  await task.save(); */
		await Task.create({
			title,
			description,
			user: req.user,
		});
		res.status(202).json({
			success: true,
			message: "Task Added successfully",
		});
	} catch (error) {
		next(error);
	}
};

export const getMyTask = async (req, res, next) => {
	try {
		const userid = req.user._id;
		// console.log(userid);
		const tasks = await Task.find({ user: userid });
		res.status(200).json({
			success: true,
			tasks,
		});
	} catch (error) {
		next(error);
	}
};

export const updateTask = async (req, res, next) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const task = await Task.findById(req.params.id);
		if (!task) {
			return next(new errorHandler("Task not Found or invalid id", 404));
		}

		task.isCompleted = !task.isCompleted;
		await task.save();
		res.status(200).json({
			success: true,
			message: "Task Updated!",
		});
	} catch (error) {
		next(error);
	}
};

export const deleteTask = async (req, res, next) => {
	try {
		const task = await Task.findById(req.params.id);
		if (!task) {
			return next(new errorHandler("Task not found", 404));
		}
		await task.deleteOne();
		res.status(200).json({
			success: true,
			message: "Task Deleted!",
		});
	} catch (error) {
		next(error);
	}
};
