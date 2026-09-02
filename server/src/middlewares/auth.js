//JWT-Authentication middleware 
//its job is to verify that the request comes from a logged-in user before allowing the request to continue.
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.token; //expecting token from client in req header

        if(!token){
            return res.status(401).json({
                success : false,
                message : "Unauthorized User, Login again"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verify the token using the secret key

        const user = await User.findById(decoded.user_id).select("-passwordHash"); //taking everything except password

        if(!user) return res.status(401).json({
            success : false,
            message : "User not found!"
        });

        //if user is found then add it to req object
        req.user = user;

        next();

    }catch(error) {
        return res.status(401).json({
            success : false,
            message : "Unauthorized User, Login again"
        });
    }
}

// function to get authenticated user data assuming protectRoute is already checked the authentication and added the user in req

export const checkAuth = (req,res) => {
    res.status(200).json({
        success : true,
        user : req.user
    })
}

