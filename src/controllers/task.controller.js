import * as taskService from "../services/task.service.js";

export const createTask = async (req, res, next) => {
    try {

        const task = await taskService.createTask(req.body);

        return res.status(201).json({
            success: true,
            message: "Task created successfully.",
            task
        });

    } catch (error) {
        next(error);
    }
};

export const getAllTasks = async (req, res, next) => {
    try {

        const tasks = await taskService.getAllTasks();

        return res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (req, res, next) => {
    try {

        const task = await taskService.getTaskById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found."
            });
        }

        return res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try {

        const task = await taskService.updateTask(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Task updated successfully.",
            task
        });

    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try {

        await taskService.deleteTask(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully."
        });

    } catch (error) {
        next(error);
    }
};