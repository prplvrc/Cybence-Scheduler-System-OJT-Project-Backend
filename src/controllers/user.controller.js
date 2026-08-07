import * as userService from "../services/user.service.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user: updatedUser
        });

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });

    } catch (error) {
        next(error);
    }
};