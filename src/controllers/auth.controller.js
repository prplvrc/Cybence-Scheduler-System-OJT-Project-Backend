import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {

    try {

        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            user
        });

    } catch (error) {
        next(error);
    }

};

export const login = async (req, res, next) => {

    try {
        console.log(req.body);
        
        const result = await authService.login(req.body);

        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        next(error);
    }

};