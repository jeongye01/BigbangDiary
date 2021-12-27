import express from "express";
import {seeProfile,editUser,deleteUser,changePassword} from "../controllers/userController";
import { protectedMiddleware,avatarUpload } from '../middlewares';

const userRouter=express.Router();



userRouter.all(protectedMiddleware).route("/edit").get(editUser).post(avatarUpload.single("avatar"),editUser);
userRouter.get("/delete",protectedMiddleware,deleteUser);
userRouter.all(protectedMiddleware).route("/change-password").get(changePassword).post(changePassword);

userRouter.get("/:id",protectedMiddleware,seeProfile);

export default userRouter;