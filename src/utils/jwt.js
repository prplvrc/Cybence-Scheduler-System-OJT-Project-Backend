import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "replace_with_a_long_random_secret";

export const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};