import * as requestService from "../services/request.service.js";


export const createRequest = async (req, res, next) => {
    try {

        const request = await requestService.createRequest(req.body);

        return res.status(201).json({
            success: true,
            message: "Request created successfully.",
            request
        });

    } catch (error) {
        next(error);
    }
};


export const getAllRequests = async (req, res, next) => {
    try {

        const requests = await requestService.getAllRequests();

        return res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {
        next(error);
    }
};


export const getRequestById = async (req, res, next) => {
    try {

        const request = await requestService.getRequestById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found."
            });
        }

        return res.status(200).json({
            success: true,
            request
        });

    } catch (error) {
        next(error);
    }
};


export const updateRequest = async (req, res, next) => {
    try {

        const request = await requestService.updateRequest(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Request updated successfully.",
            request
        });

    } catch (error) {
        next(error);
    }
};


export const deleteRequest = async (req, res, next) => {
    try {

        await requestService.deleteRequest(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Request deleted successfully."
        });

    } catch (error) {
        next(error);
    }
};


export const approveRequest = async (req, res, next) => {
    try {

        const request = await requestService.approveRequest(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Request approved successfully.",
            request
        });

    } catch (error) {
        next(error);
    }
};


export const rejectRequest = async (req, res, next) => {
    try {

        const request = await requestService.rejectRequest(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Request rejected successfully.",
            request
        });

    } catch (error) {
        next(error);
    }
};