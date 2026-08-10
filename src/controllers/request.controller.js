import * as requestService from "../services/request.service.js";

export const getRequests = async (req, res, next) => {
  try {
    const requests = await requestService.getAllRequests();
    res.status(200).json({ success: true, requests });
  } catch (error) {
    next(error);
  }
};

export const getRequestById = async (req, res, next) => {
  try {
    const request = await requestService.getRequestById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });
    res.status(200).json({ success: true, request });
  } catch (error) {
    next(error);
  }
};

export const createRequest = async (req, res, next) => {
  try {
    const newRequest = await requestService.createRequest(req.body);
    res.status(201).json({ success: true, request: newRequest });
  } catch (error) {
    next(error);
  }
};

export const updateRequest = async (req, res, next) => {
  try {
    const updated = await requestService.updateRequest(req.params.id, req.body);
    res.status(200).json({ success: true, request: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteRequest = async (req, res, next) => {
  try {
    await requestService.deleteRequest(req.params.id);
    res.status(200).json({ success: true, message: "Request deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const approveRequest = async (req, res, next) => {
  try {
    const request = await requestService.updateStatus(req.params.id, "Approved");
    res.status(200).json({ success: true, request });
  } catch (error) {
    next(error);
  }
};

export const rejectRequest = async (req, res, next) => {
  try {
    const request = await requestService.updateStatus(req.params.id, "Rejected");
    res.status(200).json({ success: true, request });
  } catch (error) {
    next(error);
  }
};