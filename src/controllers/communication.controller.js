import * as communicationService from "../services/communication.service.js";

export const createMessage = async (req, res, next) => {
    try {

        const message = await communicationService.createMessage(req.body);

        return res.status(201).json({
            success: true,
            message: "Message created successfully.",
            data: message
        });

    } catch (error) {
        next(error);
    }
};

export const getAllMessages = async (req, res, next) => {
    try {

        const messages = await communicationService.getAllMessages();

        return res.status(200).json({
            success: true,
            data: messages
        });

    } catch (error) {
        next(error);
    }
};

export const getMessageById = async (req, res, next) => {
    try {

        const message = await communicationService.getMessageById(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: message
        });

    } catch (error) {
        next(error);
    }
};

export const updateMessage = async (req, res, next) => {
    try {

        const message = await communicationService.updateMessage(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Message updated successfully.",
            data: message
        });

    } catch (error) {
        next(error);
    }
};

export const deleteMessage = async (req, res, next) => {
    try {

        await communicationService.deleteMessage(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Message deleted successfully."
        });

    } catch (error) {
        next(error);
    }
};