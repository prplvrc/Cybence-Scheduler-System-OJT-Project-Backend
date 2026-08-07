import * as dashboardService from "../services/dashboard.service.js";

export const getDashboardStats = async (req, res, next) => {
    try {

        const stats = await dashboardService.getDashboardStats();

        return res.status(200).json({
            success: true,
            data: stats
        });

    } catch (error) {
        next(error);
    }
};

export const getRecentTasks = async (req, res, next) => {
    try {

        const tasks = await dashboardService.getRecentTasks();

        return res.status(200).json({
            success: true,
            data: tasks
        });

    } catch (error) {
        next(error);
    }
};

export const getUpcomingEvents = async (req, res, next) => {
    try {

        const events = await dashboardService.getUpcomingEvents();

        return res.status(200).json({
            success: true,
            data: events
        });

    } catch (error) {
        next(error);
    }
};

export const getRecentRequests = async (req, res, next) => {
    try {

        const requests = await dashboardService.getRecentRequests();

        return res.status(200).json({
            success: true,
            data: requests
        });

    } catch (error) {
        next(error);
    }
};

export const getRecentMessages = async (req, res, next) => {
    try {

        const messages = await dashboardService.getRecentMessages();

        return res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {
        next(error);
    }
};