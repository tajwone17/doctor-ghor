import express from "express";
import { registerUser,loginUser,getUserDetails } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-user-info",authUser, getUserDetails);
export default userRouter;