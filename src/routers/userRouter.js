import express from "express";
import {seeProfile,editUser,removeUser} from "../controllers/userConroller";

const userRouter=express.Router();

userRouter.get("/:id",seeProfile);
userRouter.route("/:id/edit").get(editUser).post(editUser);
userRouter.get("/:id/delete",removeUser);



export default userRouter;