import express from "express";
import { registerUser,loginUser,getUserDetails,updateUserDetails } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-user-info",authUser, getUserDetails);
userRouter.put("/update-user-info",upload.single("image"),authUser, updateUserDetails);

export default userRouter;