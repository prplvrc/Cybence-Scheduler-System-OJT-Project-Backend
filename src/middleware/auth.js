import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "replace_with_a_long_random_secret";

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const decoded = jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};

export default auth;