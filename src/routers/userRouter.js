import express from "express";
import {seeProfile,editUser,deleteUser,changePassword} from "../controllers/userController";
import { protectedMiddleware } from '../middlewares';

const userRouter=express.Router();



userRouter.get("/:id",protectedMiddleware,seeProfile);
userRouter.all(protectedMiddleware).route("/edit").get(editUser).post(editUser);
userRouter.get("/delete",protectedMiddleware,deleteUser);
userRouter.all(protectedMiddleware).route("/change-password").get(changePassword).post(changePassword);


export default userRouter;