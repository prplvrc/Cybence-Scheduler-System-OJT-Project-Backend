import * as calendarService from "../services/calendar.service.js";

export const createEvent = async (req, res, next) => {
    try {

        const event = await calendarService.createEvent(req.body);

        return res.status(201).json({
            success: true,
            message: "Calendar event created successfully.",
            event
        });

    } catch (error) {
        next(error);
    }
};

export const getAllEvents = async (req, res, next) => {
    try {

        const events = await calendarService.getAllEvents();

        return res.status(200).json({
            success: true,
            events
        });

    } catch (error) {
        next(error);
    }
};

export const getEventById = async (req, res, next) => {
    try {

        const event = await calendarService.getEventById(req.params.id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Calendar event not found."
            });
        }

        return res.status(200).json({
            success: true,
            event
        });

    } catch (error) {
        next(error);
    }
};

export const updateEvent = async (req, res, next) => {
    try {

        const event = await calendarService.updateEvent(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Calendar event updated successfully.",
            event
        });

    } catch (error) {
        next(error);
    }
};

export const deleteEvent = async (req, res, next) => {
    try {

        await calendarService.deleteEvent(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Calendar event deleted successfully."
        });

    } catch (error) {
        next(error);
    }
};