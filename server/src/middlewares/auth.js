//JWT-Authentication middleware 
//its job is to verify that the request comes from a logged-in user before allowing the request to continue.
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User, Login again"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await User.findById(decoded.user_id)
            .select("-passwordHash");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found!"
            });
        }

        req.user = user;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized User, Login again"
        });
    }
};

// function to get authenticated user data assuming protectRoute is already checked the authentication and added the user in req

export const checkAuth = (req,res) => {
    res.status(200).json({
        success : true,
        user : req.user
    })
}

