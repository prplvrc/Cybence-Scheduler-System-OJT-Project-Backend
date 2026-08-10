import * as userService from "../services/user.service.js";

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Remove sensitive data before sending back
    const { password, ...userWithoutPassword } = user;
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateUserProfile(req.params.id, req.body);
    const { password, ...userWithoutPassword } = updatedUser;
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await userService.changePassword(req.params.id, currentPassword, newPassword);
    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateNotifications = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateNotificationSettings(req.params.id, req.body);
    const { password, ...userWithoutPassword } = updatedUser;
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};