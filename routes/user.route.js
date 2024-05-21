import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { deleteUserById, getAllUsers, getUserById, putUserById } from "../controllers/user.controller.js";


export const userRoute = Router();


userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.get('/users', getAllUsers);
userRoute.get('/users/:userId', getUserById);
userRoute.put('/users/:userId', putUserById);
userRoute.delete('/users/:userId', deleteUserById);