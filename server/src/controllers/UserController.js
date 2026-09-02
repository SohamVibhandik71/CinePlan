import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils.js";

//Sign Up -> create user
export const signUp = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing Details"
            });
        }

        // Check if account already exists
        const user = await User.findOne({ email }).select("-password");

        if (user) {
            return res.status(409).json({
                success: false,
                message: "Account already exists!"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            name,
            email,
            passwordHash: hashedPassword
        });

        // Generate JWT
        const token = generateToken(newUser._id);

        // Send response
        return res.status(201).json({
            success: true,
            userData: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token,
            message: "Account Created Successfully"
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login
export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Find user
        const userData = await User.findOne({ email });

        // User doesn't exist
        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            userData.passwordHash
        );

        // Incorrect password
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // Correct credentials -> generate JWT
        const token = generateToken(userData._id);

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            userData: {
                _id: userData._id,
                name: userData.name,
                email: userData.email
            }
        });

    } catch (error) {
        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};