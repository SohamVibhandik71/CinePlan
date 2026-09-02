import express from 'express';
import { login, signUp } from '../controllers/UserController.js';
import { checkAuth, protectRoute } from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/signup',signUp);
userRouter.post('/login',login);
userRouter.get('/check',protectRoute, checkAuth);

export default userRouter;