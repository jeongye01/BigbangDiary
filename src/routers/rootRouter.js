import express from "express";
import {home,search} from "../controllers/diaryConroller";
import {login,logout,join} from "../controllers/userConroller";

const rootRouter=express.Router();


rootRouter.get("/",home);
rootRouter.route("/join").get(join).post(join);
rootRouter.route("/login").get(login).post(login);
rootRouter.get("/logout",logout);
rootRouter.get("search",search);




export default rootRouter;