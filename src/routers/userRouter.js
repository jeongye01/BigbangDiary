import express from "express";
import {seeProfile,editUser,deleteUser} from "../controllers/userController";

const userRouter=express.Router();

userRouter.get("/:id",seeProfile);
userRouter.route("/:id/edit").get(editUser).post(editUser);
userRouter.get("/:id/delete",deleteUser);



export default userRouter;