import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export function protect(req, res, next) {
    let token;

    // 1. Check for the token in the standard "Bearer <token>" format
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (e.g., 'Bearer tokenValue' -> 'tokenValue')
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token
            const decoded = jwt.verify(token, JWT_SECRET);

            // 3. Attach the user data to the request object
            // Assumes your JWT payload includes the user's ID (e.g., { id: 1234... })
            req.user = { id: decoded.id };

            // Proceed to the next middleware or controller
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            // Block if verification fails (e.g., expired, wrong signature)
            return res.status(401).json({
                success: false,
                message: 'Not authorized, token failed or is expired.'
            });
        }
    }

    if (!token) {
        // Block if no token is provided in the header
        return res.status(401).json({
            success: false,
            message: 'Not authorized, no token provided.'
        });
    }
}